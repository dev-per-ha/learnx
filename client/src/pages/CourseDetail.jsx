import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaFilePdf, FaQuestionCircle } from "react-icons/fa";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);

  useEffect(() => {
    fetch(`https://learnxbackend.onrender.com/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
      })
      .catch((err) => console.error(err));
  }, [courseId]);

  if (!course) {
    return <p className="p-6 text-center text-lg font-medium text-gray-500">Loading...</p>;
  }

  const modules = course.modules || [];
  const selectedModule = modules[selectedModuleIndex] || null;

  const goPrev = () => {
    if (selectedModuleIndex > 0) {
      setSelectedModuleIndex(selectedModuleIndex - 1);
    }
  };

  const goNext = () => {
    if (selectedModuleIndex < modules.length - 1) {
      setSelectedModuleIndex(selectedModuleIndex + 1);
    }
  };

  return (
<div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-6 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 mt-20">
      {/* Module List */}
      <div className="md:w-1/3 bg-white p-5 rounded-2xl shadow-lg border border-gray-200 max-h-[80vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">📚 Modules</h2>
        {modules.length === 0 ? (
          <p className="text-gray-500 italic">No modules available.</p>
        ) : (
          <ul className="space-y-2">
            {modules.map((mod, idx) => (
              <li
                key={mod._id}
                onClick={() => setSelectedModuleIndex(idx)}
                className={`cursor-pointer p-3 rounded-lg shadow-sm transition-all duration-300 ${
                  idx === selectedModuleIndex
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-50 hover:bg-blue-100 text-gray-800"
                }`}
              >
                {`Module ${idx + 1}: ${mod.title}`}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Module Detail */}
      <div className="md:w-2/3 bg-white p-6 rounded-2xl shadow-lg border border-gray-200 overflow-auto max-h-[80vh]">
        {selectedModule ? (
          <>
            <h2 className="text-3xl font-extrabold mb-3 text-gray-800">{selectedModule.title}</h2>
            <p className="mb-4 text-gray-700 leading-relaxed">{selectedModule.description}</p>

            {/* Video */}
            {selectedModule.videoUrl && (
              <div className="mb-6 aspect-video rounded-lg overflow-hidden shadow">
                <iframe
                  src={selectedModule.videoUrl}
                  title={selectedModule.title}
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {selectedModule.pdfUrl && (
                <a
                  href={`http://localhost:5000${selectedModule.pdfUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition"
                >
                  <FaFilePdf /> Download PDF
                </a>
              )}

              {selectedModule.quizUrl && (
                <a
                  href={`http://localhost:5000${selectedModule.quizUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
                >
                  <FaQuestionCircle /> Download Quiz
                </a>
              )}

              {/* Navigation */}
              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={goPrev}
                  disabled={selectedModuleIndex === 0}
                  className={`p-3 rounded-full shadow transition ${
                    selectedModuleIndex === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={goNext}
                  disabled={selectedModuleIndex === modules.length - 1}
                  className={`p-3 rounded-full shadow transition ${
                    selectedModuleIndex === modules.length - 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500 italic">Select a module to see details.</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
