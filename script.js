let Weathercity = document.querySelector(".Weathercity");
let Weathertimedate = document.querySelector(".Weathertimedate");
let weatherforecast = document.querySelector(".weatherforecast");
let weathericon = document.querySelector(".weathericon");
let weathertemperature = document.querySelector(".weathertemperature");
let weathermin = document.querySelector(".weathermin");
let weathermax = document.querySelector(".weathermax");
let weatherfeel = document.querySelector(".weatherfeel");
let weatherhumidity = document.querySelector(".weatherhumidity");
let weatherwind = document.querySelector(".weatherwind");
let weatherpressure = document.querySelector(".weatherpressure");
let search = document.querySelector(".search");

// get the actual country name
const getcountryname = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);;
};

const gettimedate = (seconds) => {
    const date = new Date(seconds * 1000); // Convert to milliseconds

    // Format the date
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);

}

let city = "ballia";
// search functionality
search.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityname = document.querySelector(".cityname")
    console.log(cityname.value);
    city = cityname.value;
    getweatherdata();
    cityname.value = "";
});


const getweatherdata = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=2d600958e6ae2194b56872315092001b`;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=ballia&APPID=2d600958e6ae2194b56872315092001b`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        const { main, name, weather, wind, sys, dt } = data;
        Weathercity.innerHTML = `${name} , ${getcountryname(sys.country)} `;
        Weathertimedate.innerHTML = gettimedate(dt);
        weatherforecast.innerHTML = weather[0].main;
        weathericon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;
        weathertemperature.innerHTML = `${main.temp.toFixed() - 273}°C`;
        weathermin.innerHTML = `Min : ${main.temp_min.toFixed() - 273}°C`;
        weathermax.innerHTML = `Max : ${main.temp_max.toFixed() - 273}°C`;
        weatherfeel.innerHTML = `${main.feels_like.toFixed() - 273} °C`;
        weatherhumidity.innerHTML = `${main.humidity} %`;
        weatherwind.innerHTML = `${wind.speed} m/s`;
        weatherpressure.innerHTML = `${main.pressure} hPa`;
    }
    catch (error) {
        console.log(error);
    }

}
document.body.addEventListener("click", getweatherdata());

