const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.handler = async (event) => {
    const query = event.queryStringParameters.q;
    console.log("🔍 Search Query Received:", query);

    const prompt = `Find the best budget-friendly alternative (dupe) for: ${query}. 
    The dupe must be available on Amazon. Do NOT provide URLs, just return the product name and brand.
    Example: "Tozo T10 Wireless Earbuds"`;

    console.log("🔍 Sending request to Gemini API with prompt:", prompt);

    try {
        // Gemini expects the request in a specific format
        const result = await model.generateContent({
            contents: [{ parts: [{ text: prompt }] }],
        });

        const dupeResult = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "No Amazon dupe found.";

        console.log("🔍 AI Suggested Dupe:", dupeResult);

        // Generate an Amazon search URL with the affiliate tag
        const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(dupeResult)}&tag=finddupe-20`;

        return {        
            statusCode: 200,
            body: JSON.stringify({ dupe: dupeResult, link: amazonSearchUrl }),
        };
    } catch (error) {
        console.error("❌ Error fetching from Gemini API:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error fetching dupe." }),
        };
    }
};