function searchLocation() {
    const resultDiv = document.getElementById("result");
    const input = document.getElementById("locationInput").value.toLowerCase().trim();
    resultDiv.innerHTML = "";

    if (!input) {
        resultDiv.innerHTML = "<p>Please enter a location</p>";
        return;
    }

    fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        let matches = [];

        data.beaches.forEach(item => {
            if (item.name.toLowerCase().includes(input) || 
            item.description.toLowerCase().includes(input)) {
                matches.push(item);
            }
        });

        data.temples.forEach(item => {
            if (item.name.toLowerCase().includes(input) || 
        item.description.toLowerCase().includes(input)) {
                matches.push(item);
            }
        });

        data.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(input) || 
            city.description.toLowerCase().includes(input)) {
                    matches.push(city);
                }
            });
        });

        if (matches.length === 0) {
            resultDiv.innerHTML = "<p>No results found</p>";
            return;
        }

        matches.forEach(item => {
            resultDiv.innerHTML += `
            <div class="card">
            <img src="${item.imageUrl}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <button>Visit</button>
            </div>`;
        });
    });
}

document.getElementById("btnSearch").addEventListener("click", searchLocation);
document.getElementById("btnClear").addEventListener("click", () => {
    document.getElementById("result").innerHTML = "";
    document.getElementById("locationInput").value = "";
});