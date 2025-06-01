const express = require("express");
const { runSlither } = require("../audits/runSlither");
const { askCloudAI } = require("../openai");

const router = express.Router();

router.post("/", async (req, res) => {
  const { code } = req.body;

  try {
    const slitherReport = await runSlither(code);
    const gptResponse = await askCloudAI(code, slitherReport);

    res.json({ slither: slitherReport, gpt: gptResponse });
  } catch (err) {
    console.error("Error during audit route:", err);
    res.status(500).json({ error: true, message: err.message });
  }
});

module.exports = router;
