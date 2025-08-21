import { FaCode, FaChalkboardTeacher, FaLightbulb, FaUsers, FaLaptopCode, FaComments } from "react-icons/fa";

export default function About() {
  const digitalSkills = [
    {
      icon: <FaCode />,
      title: "Web Development",
      desc: "Build modern, responsive websites using HTML, CSS, JavaScript, and frameworks.",
      color: "text-blue-500",
    },
    {
      icon: <FaLaptopCode />,
      title: "Software Tools",
      desc: "Master productivity apps like Notion, Trello, and other industry-standard platforms.",
      color: "text-green-500",
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "E-Learning Skills",
      desc: "Learn to adapt quickly to new technologies and online platforms.",
      color: "text-blue-400",
    },
  ];

  const softSkills = [
    {
      icon: <FaLightbulb />,
      title: "Problem-Solving",
      desc: "Analyze challenges and develop creative, effective solutions.",
      color: "text-green-400",
    },
    {
      icon: <FaUsers />,
      title: "Teamwork",
      desc: "Collaborate effectively with others to achieve shared goals.",
      color: "text-blue-500",
    },
    {
      icon: <FaComments />,
      title: "Communication",
      desc: "Express ideas clearly and listen actively to build strong relationships.",
      color: "text-green-500",
    },
  ];

  return (
    <section id="about" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-6 animate-fadeInUp">
          About Us
        </h2>
        <p className="text-blue-800 text-lg max-w-3xl mx-auto leading-relaxed animate-fadeInUp delay-150">
          At <span className="text-green-600 font-semibold">LearnX</span>, we empower learners with essential digital and soft skills 
          to thrive in today's competitive world. Our platform blends technical 
          expertise with personal growth, helping you succeed in any career path.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        
        {/* Digital Skills */}
        <div>
          <h3 className="text-2xl font-semibold text-green-600 mb-8 animate-fadeInUp delay-300 flex items-center space-x-3">
            <span className="text-3xl">💻</span>
            <span>Digital Skills</span>
          </h3>
          <div className="space-y-8">
            {digitalSkills.map(({ icon, title, desc, color }, i) => (
              <div
                key={title}
                className={`flex items-start space-x-5 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer animate-fadeInUp`}
                style={{ animationDelay: `${400 + i * 200}ms` }}
              >
                <div className={`${color} text-4xl flex-shrink-0`}>{icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-blue-700">{title}</h4>
                  <p className="text-green-800 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-600 mb-8 animate-fadeInUp delay-300 flex items-center space-x-3">
            <span className="text-3xl">🤝</span>
            <span>Soft Skills</span>
          </h3>
          <div className="space-y-8">
            {softSkills.map(({ icon, title, desc, color }, i) => (
              <div
                key={title}
                className={`flex items-start space-x-5 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer animate-fadeInUp`}
                style={{ animationDelay: `${400 + i * 200}ms` }}
              >
                <div className={`${color} text-4xl flex-shrink-0`}>{icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-green-700">{title}</h4>
                  <p className="text-blue-800 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation-name: fadeInUp;
          animation-fill-mode: both;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }
      `}</style>
    </section>
  );
}
