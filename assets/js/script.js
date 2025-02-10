function searchDupe() {
    let query = document.getElementById("dupeSearch").value;
    if(query) {
        alert("Searching for: " + query);
        // Future API integration will go here
    } else {
        alert("Please enter a product name.");
    }
}