const getTemp = async (city) => {

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ef41d4536c99cea44708ae471c5d71c&units=metric`, {
        headers: {
            accept: 'application/json'
        }
    })
    if (!response.ok) {
        throw new Error("Could not get the information")
    }
    let data = await response.json();
    return data
}
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const cityName = document.querySelector("#city");
const date = document.querySelector("#date");
const time = document.querySelector("#time");
const description = document.querySelector("#condition");
const conditionIcon = document.querySelector("#conditionIcon");
const temp = document.querySelector("#temp");
const tempMax = document.querySelector("#tempMax")
const tempMin = document.querySelector("#tempMin")

const searchBar = document.querySelector("#searchBar");
const searchBarInput = document.querySelector("#searchBarInput");
const searchIcon = document.querySelector("#searchIcon");

const dateObj = new Date()



date.innerText += months[dateObj.getMonth()] + " " + dateObj.getDate() + ", " + dateObj.getFullYear()

const searchCity = async (city) => {
    try {

        let data = await getTemp(city)


        //cityName
        cityName.innerText = data["name"];
        cityName.style.color = "#fff";

        // desc
        let icon = data.weather[0]["icon"]
        console.log(icon)
        description.innerText = data["weather"][0]["main"]
        conditionIcon.src = `https://openweathermap.org/payload/api/media/file/${icon}.png`;
        conditionIcon.style.opacity = "1"

        //mainTemp
        temp.innerText = data["main"]["temp"] + "°C"

        //highs and lows
        tempMax.innerText = data["main"]["temp_max"] + "°C"
        tempMin.innerText = data["main"]["temp_min"] + "°C"

    } catch (err) {
        cityName.innerText = "Please try again";
        cityName.style.color = "red"
        console.log(err)

    }
}

window.addEventListener("load", async (evt) => {
    evt.preventDefault();
    let timeUpdate = setInterval(() => {
        let dateObj = new Date()
        let currTime = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
        time.innerText = currTime;

    }, 1000);
    searchCity("tokyo")


})

searchBar.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    let city = searchBarInput.value;


    searchCity(city)

})

