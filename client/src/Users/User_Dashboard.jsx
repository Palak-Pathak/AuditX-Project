import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { jsPDF } from "jspdf";

const kuromiImg = "Assets/Kuromi.png";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/reports", {
          withCredentials: true,
        });
        setReports(res.data);
      } catch (err) {
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const generatePDF = (report) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Audit Report", 14, 22);

    doc.setFontSize(12);
    doc.text(`Report Name: ${report.report_name}`, 14, 40);
    doc.text(`Risk Level: ${report.risk_level}`, 14, 50);
    doc.text(`Created At: ${new Date(report.created_at).toLocaleString()}`, 14, 60);

    doc.text("Vulnerabilities:", 14, 75);
    const vulnText = Object.entries(report.vulnerabilities || {})
      .map(([type, count]) => `• ${type}: ${count}`)
      .join("\n");

    doc.text(vulnText || "None found", 14, 85);

    doc.save(`${report.report_name || "audit_report"}.pdf`);
  };

  const isRecent = (date) => {
    const now = new Date();
    const reportDate = new Date(date);
    const diffInHours = (now - reportDate) / (1000 * 60 * 60);
    return diffInHours <= 24;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center mt-20">
        <motion.div
          className="rounded-full border-4 border-t-4 border-pink-500 w-12 h-12 border-t-transparent animate-spin"
          aria-label="Loading spinner"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );

  if (error)
    return (
      <motion.p
        className="text-center mt-10 text-red-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {error}
      </motion.p>
    );

  if (reports.length === 0)
    return (
      <motion.p
        className="text-center mt-10 text-pink-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        No reports found.
      </motion.p>
    );

  return (
    <motion.section
      className="overflow-x-auto max-w-6xl mx-auto bg-[#1e1a2e] rounded-xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className="min-w-full text-left text-white text-sm md:text-base">
        <thead className="bg-[#2a2540] text-pink-300">
          <tr>
            <th className="py-3 px-5">Report Name</th>
            <th className="py-3 px-5">Vulnerabilities</th>
            <th className="py-3 px-5">Risk Level</th>
            <th className="py-3 px-5">Created</th>
            <th className="py-3 px-5">Download</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <motion.tr
              key={report.id}
              className={`border-b border-gray-700 transition cursor-default ${
                isRecent(report.created_at)
                  ? "bg-[#2a2540] shadow-[0_0_12px_#ec489980]"
                  : "hover:bg-[#322a50]"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <td className="py-3 px-5">{report.report_name}</td>
              <td className="py-3 px-5">
                {Object.keys(report.vulnerabilities).length} types
              </td>
              <td className="py-3 px-5 capitalize text-yellow-300">
                {report.risk_level}
              </td>
              <td className="py-3 px-5">
                {new Date(report.created_at).toLocaleString()}
              </td>
              <td className="py-3 px-5">
                <motion.button
                  onClick={() => generatePDF(report)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-600 hover:bg-pink-700 text-white py-1 px-3 rounded-md text-sm transition-all"
                >
                  Download PDF
                </motion.button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.section>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.username || user.email || "there");
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          withCredentials: true,
        });
        const freshUser = res.data;
        setUserName(freshUser.username || freshUser.email || "there");
        localStorage.setItem("user", JSON.stringify(freshUser));
      } catch (err) {
        console.error("Failed to fetch user", err.response?.data || err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-[#0b0018] via-[#150022] to-black text-white overflow-hidden px-6 pt-32 pb-24 select-none">
      {/* Glowing Blobs */}
      <motion.div
        className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-pink-400 opacity-30 blur-[180px] rounded-full animate-pulse -z-10"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-1/4 w-[500px] h-[500px] bg-purple-600 opacity-30 blur-[180px] rounded-full animate-pulse delay-300 -z-10"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.3 }}
      />

      {/* SVG Wave */}
      <svg
        className="absolute bottom-0 w-full h-[400px] -z-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff00cc" />
            <stop offset="100%" stopColor="#333399" />
          </linearGradient>
        </defs>
        <path
          fill="url(#grad)"
          fillOpacity="0.4"
          d="M0,160L40,149.3C80,139,160,117,240,101.3C320,85,400,75,480,96C560,117,640,171,720,181.3C800,192,880,160,960,144C1040,128,1120,128,1200,149.3C1280,171,1360,213,1400,234.7L1440,256L1440,320L0,320Z"
        >
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="
              M0,160L40,149.3C80,139,160,117,240,101.3C320,85,400,75,480,96C560,117,640,171,720,181.3C800,192,880,160,960,144C1040,128,1120,128,1200,149.3C1280,171,1360,213,1400,234.7L1440,256L1440,320L0,320Z;
              M0,180L40,160C80,140,160,100,240,96C320,92,400,124,480,144C560,164,640,172,720,160C800,148,880,116,960,128C1040,140,1120,196,1200,213C1280,229,1360,203,1400,190L1440,176L1440,320L0,320Z;
              M0,160L40,149.3C80,139,160,117,240,101.3C320,85,400,75,480,96C560,117,640,171,720,181.3C800,192,880,160,960,144C1040,128,1120,128,1200,149.3C1280,171,1360,213,1400,234.7L1440,256L1440,320L0,320Z"
          />
        </path>
      </svg>

      {/* Hero + Reports Container */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 mt-16">
        <motion.div
          className="text-center md:text-left max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-400 mb-6 drop-shadow-[0_0_20px_rgba(255,0,255,0.3)]">
            Welcome {userName || "there"}
          </h1>
          <p className="text-white/80 text-xl md:text-2xl leading-relaxed">
            Dive into AI-powered auditing tools crafted to secure your smart
            contracts in style.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/try")}
            className="mt-10 px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 hover:shadow-[0_0_12px_#ec489980] transition-all text-white font-semibold"
          >
            Start Auditing
          </motion.button>
        </motion.div>

        <motion.img
          src={kuromiImg}
          alt="Kuromi"
          className="w-52 h-52 md:w-64 md:h-64 select-none hover:brightness-110 transition"
          animate={{ rotateY: [0, 180, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Reports Section */}
      <motion.div
        className="mt-20 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-pink-300 mb-6 text-center">
          Recent Audit Reports
        </h2>
        <Reports />
      </motion.div>
    </section>
  );
};

export default Dashboard;
