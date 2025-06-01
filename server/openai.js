{/*const axios = require("axios");

async function askCloudAI(code, slitherOutput) {
  const prompt = `
You are an advanced smart contract auditor AI...

Solidity Contract:
\`\`\`solidity
${code}
\`\`\`

---

Slither Static Analysis Output:
\`\`\`
${slitherOutput}
\`\`\`
`;

  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = res.data?.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("Cloud AI did not return a valid response.");
    }

    return aiResponse;
  } catch (err) {
    console.error("Cloud AI request failed:", err.message);
    throw new Error("Failed to get response from Cloud AI");
  }
}

module.exports = { askCloudAI };
*/}