import { FaUserPlus, FaBookOpen, FaPlayCircle, FaFilePdf, FaClipboardList } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Sign Up / Register",
      description:
        "Create your free account to access all courses and track your progress.",
      amharic: "አካውንት ክፈት እና ትምህርቶችን ተጠቃሚ አድርግ።",
      color: "bg-green-500",
      border: "border-t-4 border-l-8 border-green-600",
    },
    {
      icon: <FaBookOpen />,
      title: "Choose a Course",
      description:
        "Browse and select the course you want to learn from our diverse offerings.",
      amharic: "የሚፈልጉትን ኮርስ ከዝርዝር ይምረጡ።",
      color: "bg-blue-600",
      border: "border-b-4 border-r-8 border-blue-700",
    },
    {
      icon: <FaPlayCircle />,
      title: "Start Learning",
      description:
        "Click the 'Learn Now' button and begin with Module 1 of your selected course.",
      amharic: "በ 'Learn Now' አዝራር መጀመር እና ከመምህሩ መምህር 1 ጀምር።",
      color: "bg-green-600",
      border: "border-t-4 border-r-8 border-green-700",
    },
    {
      icon: <FaFilePdf />,
      title: "Download PDF",
      description:
        "Access and download PDF resources for deeper understanding of each module.",
      amharic: "PDF ነገሮችን አውርድ እና በጥልቅ ያማሩ።",
      color: "bg-blue-500",
      border: "border-b-4 border-l-8 border-blue-600",
    },
    {
      icon: <FaClipboardList />,
      title: "Take Quiz",
      description:
        "Test your knowledge with quizzes after completing each module.",
      amharic: "በእያንዳንዱ ሞጁል የሚከተለውን ሙከራ ያድርጉ።",
      color: "bg-green-500",
      border: "border-t-4 border-l-8 border-green-600",
    },
  ];

  return (
    <section id="how-to-learn" className="bg-gradient-to-br from-white via-blue-50 to-green-50 py-16 px-6 md:px-20">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-green-700 drop-shadow-sm">
        How to Get Started / እንዴት መጀመር እንችላለን ?
      </h2>

      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-8">
        {steps.map(({ icon, title, description, amharic, color, border }, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 max-w-sm w-full sm:w-72 ${border}`}
          >
            {/* Step number circle */}
            <div className="absolute -top-5 -left-5 bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg select-none">
              {idx + 1}
            </div>

            {/* Icon circle */}
            <div
              className={`${color} text-white text-4xl p-4 rounded-full mb-4 drop-shadow-md flex items-center justify-center w-16 h-16`}
            >
              {icon}
            </div>

            <h3 className="text-xl font-semibold mb-3 text-green-800">{title}</h3>
            <p className="text-gray-700 mb-2">{description}</p>
            <p className="text-green-700 font-semibold italic">{amharic}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
