const express = require("express");
const router = express.Router();

// POST /api/ai/summarize
router.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "No text provided" });
    }

    // Call Ollama API with stream: false
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llava:latest", // ✅ ensure this model exists
        prompt: `Summarize this note into key points:\n\n${text}`,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Ollama error:", errText);
      return res.status(500).json({ error: errText });
    }

    // Directly parse JSON since stream:false
    const data = await response.json();
    res.json({ summary: data.response || "No summary available." });

  } catch (error) {
    console.error("Ollama summarization error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
