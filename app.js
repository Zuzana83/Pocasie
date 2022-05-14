// Variables
const tbodyEl = document.getElementById("tbody");
const showBtn = document.getElementById("show");

const API_URL = "https://www.metaweather.com/api/location/44418";

getConditions(`${API_URL}/2017/4/20/`);

 // Fetch data from API
 async function getConditions(url) {
    const res = await fetch(url);

    const data = await res.json();

    const exactDay = data.slice(0, 12);

    showTable(exactDay);
}

// Show info in table
function showTable(data) {

    data.forEach(item => {
        const {created, weather_state_name, the_temp, air_pressure, humidity, visibility} = item;
        const rowEl = document.createElement("tr");

        // Style date info
        const weatherDate = new Date(created);
        const month = weatherDate.getMonth() + 1;
        const date = weatherDate.getDate();
        const year = weatherDate.getFullYear();
        const hours = weatherDate.getHours();
        const minutes = weatherDate.getMinutes();

        let styledDate = `${date}/${month}/${year} ${hours}:${minutes}`;
        
        rowEl.innerHTML = `
            <td>${styledDate}</td>
            <td>${weather_state_name}</td>
            <td>${the_temp.toFixed(1)}</td>
            <td>${Math.round(air_pressure)}</td>
            <td>${humidity}</td>
            <td>${visibility.toFixed(2)}</td>
        `;

        tbodyEl.appendChild(rowEl);

        // console.log(styledDate);
        // console.log(typeof air_pressure);

    });

    console.log(data);
}

function showChosen(e) {
    e.preventDefault();
    
    let picked = document.getElementById("exDay").value;

    let dInput = new Date(picked);
    const date = dInput.getDate();
    const month = dInput.getMonth() + 1;
    const year = dInput.getFullYear();

    const searched = `/${year}/${month}/${date}`;

    // let searchedDateUrl = `${API_URL}${searched}`;
    let searchedDateUrl = `https://meta-weather.now.sh/api/location/44418/${year}/${month}/${date}`;

    // getConditions("https://meta-weather.now.sh/api/location/44418" + searched);
    getConditions(searchedDateUrl);

    console.log(searchedDateUrl);

}

// Event Listeners
showBtn.addEventListener("click", showChosen);