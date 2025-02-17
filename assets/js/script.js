document.getElementById("search-form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const query = document.getElementById("search-input").value;
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "Searching...";

    const response = await fetch(`/.netlify/functions/finddupe?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    resultDiv.innerHTML = `<strong>Best Dupe:</strong> ${data.dupe} <br>
                           <a href="${data.link}" target="_blank">View on Amazon</a>`;
});