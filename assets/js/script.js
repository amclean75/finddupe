const dupeDatabase = {
    "airpods": "https://www.amazon.com/dp/B08XY4H2QK?tag=finddupe-20",
    "lululemon leggings": "https://www.amazon.com/dp/B09XYZ1234?tag=finddupe-20",
    "gucci belt": "https://www.amazon.com/dp/B07ABC5678?tag=finddupe-20"
};

function searchDupe() {
    let query = document.getElementById("dupeSearch").value.toLowerCase();
    let resultsDiv = document.getElementById("searchResults");
    resultsDiv.innerHTML = "";
    
    for (let key in dupeDatabase) {
        if (query.includes(key)) {
            resultsDiv.innerHTML = `<p>Best dupe found: <a href="${dupeDatabase[key]}" target="_blank">Click here</a></p>`;
            return;
        }
    }
    
    resultsDiv.innerHTML = "<p>No dupes found. Try another search!</p>";
}