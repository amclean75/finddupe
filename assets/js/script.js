function searchDupe() {
    let query = document.getElementById("searchBox").value;
    if (!query) {
        document.getElementById("results").innerText = "Please enter a search term.";
        return;
    }

    fetch("/.netlify/functions/finddupe?query=" + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            if (data.dupeLink) {
                document.getElementById("results").innerHTML =
                    `<a href="${data.dupeLink}" target="_blank">Best dupe found: ${data.dupeTitle}</a>`;
            } else {
                document.getElementById("results").innerText = "No dupe found.";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("results").innerText = "Error fetching dupe.";
        });
}