


function get(elm) { return document.querySelector(elm)};




let currentTemperature = 0;

const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=melbourne,au&appid=7282026f6ced8fffa29a34f26f10e859'


// ------------------------------------
// ES6 then catch (for temperature)

const tempPromise = fetch(weatherAPI);

tempPromise
    .then( result => result.json() )
    .then( result => {
        console.log(result);
        
        console.log(result.main.temp);
        currentTemperature = result.main.temp;

        // once we have assigned the temperature we can then call the function
        displayTemp();
    })
    .catch(err => {
        console.log(`Error ${err} encounted`);
    });


// ------------------------------------
// ES7 async await (for icon)

async function getSkyIcon () {
    try {
        const iconPromise = await fetch(weatherAPI);
        const result = await iconPromise.json();
        console.log(result.weather[0].icon);
        currentSkyIcon = result.weather[0].icon;
    }
    catch(error) {
        console.log(error);
    } 

    // function to display sky
    function displayIcon() {
        get('#output-icon').innerHTML += `<div class="inner-icon">
        <img class="icon" src='http://openweathermap.org/img/wn/${currentSkyIcon}@2x.png' alt="current weather icon">
        </div>`;
    };
    displayIcon();
};

getSkyIcon();








// ------------------------------------
// ES7 async await (for sky conditions)

async function getSkyConditions () {
    try {
        const skyPromise = await fetch(weatherAPI);
        const result = await skyPromise.json();
        console.log(result.weather[0].description);
        currentSkyConditions = result.weather[0].description;
    }
    catch(error) {
        console.log(error);
    } 

    // function to display sky
    function displaySky() {
        get('#output-sky').innerHTML += `<div class="inner-sky">Melbourne today expects ${currentSkyConditions}</div>`;
    };
    displaySky();
};

getSkyConditions();
 


// ------------------------------------

function displayTemp() {
    //  C = k - 273.15
    const C = currentTemperature - 273.15;
    console.log(C);

    // F = k * (9/5) - 459.67
    const F = currentTemperature * (9/5) - 459.67;
    console.log(F);

    get('#output-deg').innerHTML += `<div class="inner-temp celcius">${C.toFixed(1)}&#8451</div>`;
    get('#output-deg').innerHTML += `<div class="inner-temp fahrenheit">${F.toFixed(1)}&#8457</div>`;

   
    if (C < 20) {
        document.getElementById('output-temp').style.backgroundImage="url(./images/melb-cold.jpeg)";
    } else {
        document.getElementById('output-temp').style.backgroundImage="url(./images/melb-hot.jpeg)"
    }

};





// Air quality
const airQualAPI = 'https://api.waqi.info/feed/melbourne/?token=5751f6691e1d313ab6b3a35a946deec552e63c9e';

// use async await

async function getAirQual() {
    try {
        const airQualPromise = await fetch(airQualAPI);
        const result = await airQualPromise.json();
        console.log(result.data.aqi);
        currentAirQual = result.data.aqi;

    }

    catch(error) {
        console.log(error)
    }

    function displayAirQual() {
        get('#output-air').innerHTML += `<div class="inner-air">The air quality in Melbourne today is ${currentAirQual} AQI</div>
        <div class="air-qual-container">
            <div class="air-qual-note good">0 - 50 Good</div>
            <div class="air-qual-note moderate">51 - 100 Moderate</div>
            <div class="air-qual-note unhealthy-sensitive">101 - 150 Unhealthy for sensitive groups</div>
            <div class="air-qual-note unhealthy">151 - 200 Unhealthy</div>
            <div class="air-qual-note very-unhealthy">201 - 300 Very Unhealthy</div>
            <div class="air-qual-note hazardous">300+ Hazardous</div>
        </div>`;
    };
    displayAirQual();


}

getAirQual();






