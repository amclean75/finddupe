const fetch = require("node-fetch");

exports.handler = async (event) => {
    const query = event.queryStringParameters.q;  
    const apiKey = "AIzaSyBDAg_ENG88ttCwbA0kN-_QT2lQP1cMQNY";  
    const geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    const prompt = `Find the best budget-friendly alternative (dupe) for: ${query}. The dupe must be available on Amazon. Do NOT provide URLs, just return the product name and brand. Example: "Tozo T10 Wireless Earbuds"`;

    const response = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, apiKey }),
    });

    const data = await response.json();
    const dupeResult = data.candidates?.[0]?.content?.parts?.[0]?.text || "No Amazon dupe found.";

    // Generate a proper Amazon search URL with affiliate tag
    const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(dupeResult)}&tag=finddupe-20`;

    return {
        statusCode: 200,
        body: JSON.stringify({ dupe: dupeResult, link: amazonSearchUrl }),
    };
};