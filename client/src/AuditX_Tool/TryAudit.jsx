import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const TryAudit = () => {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAudit = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    if (!code.trim()) {
      setError("Please paste your smart contract code.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/audit`,
        { code }
      );
      
      setResponse(res.data);
    } catch (err) {
      setError("Audit failed. Please try again.");
      console.error("Audit error:", err);
    }

    setLoading(false);
  };

  const handleDownloadPDF = () => {
    if (!response) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor("#000000");
    doc.text("Smart Contract Audit Report", 14, 20);

    doc.setFontSize(14);
    doc.setTextColor("#f9a8d4"); // pink-300
    doc.text("Slither Report", 14, 40);

    doc.setFontSize(11);
    doc.setTextColor("#000000");
    // splitTextToSize breaks long text into lines to fit page width
    const slitherLines = doc.splitTextToSize(response.slither || "No Slither output.", 180);
    doc.text(slitherLines, 14, 50);

    // Move Y position dynamically based on Slither content length
    let y = 50 + slitherLines.length * 7 + 10;

    doc.setFontSize(14);
    doc.setTextColor("#000000"); // fuchsia-400
    doc.text("AI Audit Report", 14, y);

    doc.setFontSize(11);
    doc.setTextColor("#000000");
    const gptLines = doc.splitTextToSize(response.gpt || "No AI output.", 180);
    doc.text(gptLines, 14, y + 10);

    doc.save("audit-report.pdf");
  };

  return (
    <div className="relative z-10 w-full min-h-screen px-6 py-20 bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-pink-500 opacity-20 blur-[200px] rounded-full animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-700 opacity-20 blur-[200px] rounded-full animate-pulse delay-300" />

      <div className="max-w-5xl mx-auto relative z-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-400 tracking-tight mb-8 drop-shadow-[0_0_20px_rgba(255,0,255,0.3)] text-center">
          Try Our Smart Contract Auditor
        </h2>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your Solidity code here..."
          className="w-full h-64 p-4 bg-black/50 border border-white/10 rounded-2xl text-sm font-mono text-white resize-none shadow-inner shadow-pink-500/10 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition"
        />

        <div className="text-center">
          <button
            onClick={handleAudit}
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Auditing..." : "Run Audit"}
          </button>
        </div>

        {error && (
          <p className="mt-6 text-center text-red-400 text-sm font-medium">{error}</p>
        )}

        {response && (
          <>
            <div className="mt-10 bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg space-y-6">
              <div>
                
                <pre className="text-sm whitespace-pre-wrap text-white/80">{response.slither || "No Slither output."}</pre>
              </div>
             { /*
              <div>
                <h3 className="text-xl font-bold text-fuchsia-400 mb-2">AI Audit Report</h3>
                <pre className="text-sm whitespace-pre-wrap text-white/80">{response.gpt || "No AI output."}</pre>
              </div>
             */}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleDownloadPDF}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl shadow-md transition-all"
              >
                Download PDF Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TryAudit;
