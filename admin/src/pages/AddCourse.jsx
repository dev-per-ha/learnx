import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editId, setEditId] = useState(null); // Track the course being edited
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await axios.get("https://learnxbackend.onrender.com/api/courses");
      setCourses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Add or update course
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        // UPDATE existing course
        await axios.put(`https://learnxbackend.onrender.com/api/courses/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditId(null);
      } else {
        // ADD new course
        await axios.post("https://learnxbackend.onrender.com/api/courses", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setTitle("");
      setDescription("");
      setImage(null);
      fetchCourses();
    } catch (error) {
      console.error(error);
      alert("Error saving course");
    }
  };

  // Load course into form for editing
  const handleEdit = (course) => {
    setEditId(course._id);
    setTitle(course.title);
    setDescription(course.description);
    setImage(null); // reset image, only replace if user uploads new one
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axios.delete(`https://learnxbackend.onrender.com/api/courses/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{editId ? "Update Course" : "Add Course"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2 w-full"
          rows={4}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          className={`px-6 py-2 rounded text-white ${editId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {editId ? "Update Course" : "Add Course"}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Courses</h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-4 sm:px-6 md:px-8">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl max-w-xl mx-auto"
          >
            <img
              src={`http://localhost:5000${course.imageUrl}`}
              alt={course.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="font-extrabold text-xl text-blue-700">{course.title}</h3>
              <p className="text-gray-700 mt-3 text-base line-clamp-3">{course.description}</p>
              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={() => handleEdit(course)}
                  className="bg-green-600 hover:bg-green-700 transition-colors text-white px-5 py-2 rounded-md shadow-md font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-600 hover:bg-red-700 transition-colors text-white px-5 py-2 rounded-md shadow-md font-semibold"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/admin/coursemodules/${course._id}`)}
                  className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-5 py-2 rounded-md shadow-md font-semibold"
                >
                  Add Modules
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCourse;
