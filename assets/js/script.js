function searchDupe() {
    let query = document.getElementById("searchBox").value;
    if (!query) {
        document.getElementById("results").innerText = "Please enter a search term.";
        return;
    }

    fetch(`/.netlify/functions/finddupe?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById("results");
            if (data.dupe && data.link) {
                resultDiv.innerHTML = `Best dupe found: <strong>${data.dupe}</strong> <a href="${data.link}" target="_blank">[View on Amazon]</a>`;
            } else {
                resultDiv.innerHTML = "No good dupe found. Try another search!";
            }
        })
        .catch(error => {
            console.error("Error fetching dupe:", error);
            document.getElementById("results").innerHTML = "Error finding a dupe. Please try again later.";
        });
}