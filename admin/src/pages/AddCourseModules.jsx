import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddCourseModules = () => {
  const { courseId } = useParams();

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [quizFile, setQuizFile] = useState(null);

  // Modules list
  const [modules, setModules] = useState([]);

  // Track editing mode
  const [editingModuleId, setEditingModuleId] = useState(null);

  const fetchModules = async () => {
    try {
      const res = await axios.get(`https://learnxbackend.onrender.com/api/courses/${courseId}`);
      setModules(res.data.modules || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [courseId]);

  // Handle form submit for add or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill title and description");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoUrl", videoUrl);
    if (pdfFile) formData.append("pdf", pdfFile);  // Important: keys must match backend multer
    if (quizFile) formData.append("quiz", quizFile);

    try {
      if (editingModuleId) {
        // Update existing module
        await axios.put(
          `https://learnxbackend.onrender.com/api/courses/${courseId}/modules/${editingModuleId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setEditingModuleId(null);
      } else {
        // Add new module
        await axios.post(
          `https://learnxbackend.onrender.com/api/courses/${courseId}/modules`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      // Clear form fields
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setPdfFile(null);
      setQuizFile(null);

      fetchModules();
    } catch (error) {
      console.error(error);
      alert("Failed to save module");
    }
  };

  // Delete module handler
const handleDeleteModule = async (moduleId) => {
  if (!window.confirm("Delete this module?")) return;
  try {
    const res = await axios.delete(
      `https://learnxbackend.onrender.com/api/courses/${courseId}/modules/${moduleId}`
    );
    console.log("Delete response:", res.data);
    fetchModules();
  } catch (error) {
    if (error.response) {
      console.error("Server responded with error:", error.response.data);
      alert("Delete failed: " + (error.response.data.error || error.response.statusText));
    } else if (error.request) {
      console.error("No response received:", error.request);
      alert("Delete failed: no response from server");
    } else {
      console.error("Error setting up request:", error.message);
      alert("Delete failed: " + error.message);
    }
  }
};


  // Start editing a module
  const handleEditModule = (mod) => {
    setEditingModuleId(mod._id);
    setTitle(mod.title);
    setDescription(mod.description);
    setVideoUrl(mod.videoUrl);
    setPdfFile(null);
    setQuizFile(null);
  };

  // Cancel editing mode
  const handleCancelEdit = () => {
    setEditingModuleId(null);
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setPdfFile(null);
    setQuizFile(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {editingModuleId ? "Update Module" : "Add Module"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow p-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Module Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full"
          required
        />
        <textarea
          placeholder="Module Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2 w-full"
          rows={3}
          required
        />
        <input
          type="url"
          placeholder="Video Embed URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <div>
          <label className="block font-semibold mb-1">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Upload Quiz File</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.xlsx,.xls,.txt"
            onChange={(e) => setQuizFile(e.target.files[0])}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700"
          >
            {editingModuleId ? "Update Module" : "Add Module"}
          </button>
          {editingModuleId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white rounded px-6 py-2 hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Modules List</h2>
      <div className="space-y-4">
        {modules.length === 0 ? (
          <p className="text-gray-600">No modules added yet.</p>
        ) : (
          modules.map((mod, idx) => (
            <div
              key={mod._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{`Module ${idx + 1}: ${mod.title}`}</h3>
                <p className="text-gray-700">{mod.description}</p>
                {mod.videoUrl && (
                  <p className="text-blue-600 text-sm mt-1">
                    Video:{" "}
                    <a
                      href={mod.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      Watch
                    </a>
                  </p>
                )}
                {mod.pdfUrl && (
                  <a
                    href={`https://learnxbackend.onrender.com${mod.pdfUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 text-sm underline mr-3"
                  >
                    PDF
                  </a>
                )}
                {mod.quizUrl && (
                  <a
                    href={`https://learnxbackend.onrender.com${mod.quizUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 text-sm underline"
                  >
                    Quiz
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditModule(mod)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteModule(mod._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddCourseModules;
