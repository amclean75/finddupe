const fetch = require("node-fetch");

exports.handler = async (event) => {
    const query = event.queryStringParameters.q;
    const apiKey = "AIzaSyBDAg_ENG88ttCwbA0kN-_QT2lQP1cMQNY";
    const geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    const prompt = `Find the best budget-friendly alternative (dupe) for: ${query}. The product must be available on Amazon. 
    - Return only the product name and brand. 
    - Do NOT return links or URLs. 
    - Example response: "Tozo T10 Wireless Earbuds"`;

    const response = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, apiKey }),
    });

    const data = await response.json();
    let dupeResult = data.candidates?.[0]?.content?.parts?.[0]?.text || "No Amazon dupe found.";

    // Ensure no direct URLs slip through
    if (dupeResult.includes("http") || dupeResult.includes("www.")) {
        dupeResult = "No valid Amazon dupe found.";
    }

    // Generate a proper Amazon search URL with your affiliate tag
    const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(dupeResult)}&tag=finddupe-20`;

    return {
        statusCode: 200,
        body: JSON.stringify({ dupe: dupeResult, link: amazonSearchUrl }),
    };
};