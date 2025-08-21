import { FaLaptopCode, FaMobileAlt } from "react-icons/fa";

const courses = [
  {
    title: "Web Development",
    pcTools: ["VS Code", "Chrome DevTools", "Node.js", "Git & GitHub", "Postman"],
    phoneTools: ["Acode", "Termux", "Spck Editor", "Dcoder", "GitHub Mobile"],
    colorStart: "from-green-400",
    colorEnd: "to-blue-500",
  },
  {
    title: "Graphics Design",
    pcTools: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "CorelDRAW", "Canva"],
    phoneTools: ["Canva", "Pixellab", "Snapseed", "Adobe Express", "Ibis Paint X"],
    colorStart: "from-blue-400",
    colorEnd: "to-green-400",
  },
  {
    title: "Video Editing",
    pcTools: [
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "DaVinci Resolve",
      "Filmora",
      "Final Cut Pro",
    ],
    phoneTools: ["CapCut", "KineMaster", "VN", "InShot", "Alight Motion"],
    colorStart: "from-green-500",
    colorEnd: "to-blue-600",
  },
  {
    title: "app development ",
    pcTools: [
      "Visual Studio Code",
      "Android Studio",
      "Xcode (Mac only)",
      "Flutter SDK + DevTools",
      "Git + GitHub",
    ],
    phoneTools: ["Expo Go (iOS & Android)", "Termux (Android)", "AIDE - Android IDE (Android)", "Kodex (iOS)", "Dcoder (iOS & Android) "],
    colorStart: "from-green-500",
    colorEnd: "to-blue-600",
  },
];

export default function LearningSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50 px-6 md:px-20">
      <h2 className="text-4xl font-extrabold text-center mb-4 text-green-700 drop-shadow-sm">
        How You Can Learn & Practice
      </h2>
      <p className="text-center text-green-800 text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
        You can learn and practice using this application and software for both computer users and mobile users.  
        <br />
        በዚህ መተግበሪያ እና ሶፍትዌሮች ለኮምፒውተር ተጠቃሚዎችና ለሞባይል ተጠቃሚዎች መማርና ማስተላለፍ ይቻላል።
      </p>

      <div className="grid gap-12 md:grid-cols-3 px-6">
        {courses.map(({ title, pcTools, phoneTools, colorStart, colorEnd }, idx) => (
          <article
            key={idx}
            className={`bg-gradient-to-br ${colorStart} ${colorEnd} rounded-xl shadow-lg text-white p-8 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl`}
            style={{ animationDelay: `${idx * 0.15}s`, animationFillMode: "forwards" }}
          >
            <h3 className="text-2xl font-semibold mb-8 text-center drop-shadow-md">{title}</h3>

            <div className="flex flex-col sm:flex-row gap-10">
              {/* PC Tools */}
              <div className="flex-1">
                <h4 className="flex items-center text-lg font-semibold mb-4">
                  <FaLaptopCode className="text-yellow-300 mr-3 text-2xl" />
                  PC Users
                </h4>
                <ul className="space-y-2 list-disc list-inside text-yellow-100">
                  {pcTools.map((tool, i) => (
                    <li key={i} className="hover:text-white transition-colors duration-200 cursor-default">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phone Tools */}
              <div className="flex-1">
                <h4 className="flex items-center text-lg font-semibold mb-4">
                  <FaMobileAlt className="text-yellow-300 mr-3 text-2xl" />
                  Phone Users
                </h4>
                <ul className="space-y-2 list-disc list-inside text-yellow-100">
                  {phoneTools.map((tool, i) => (
                    <li key={i} className="hover:text-white transition-colors duration-200 cursor-default">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
