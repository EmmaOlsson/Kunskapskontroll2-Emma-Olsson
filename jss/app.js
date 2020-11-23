
// Sets the value to the apiKey-variable
const apiKey = 'b87ddb25bb27cb53301a1fa8d993b7db';

// Selects and saves element from HTML
const body = document.querySelector('body');
const formWeather = document.querySelector('#form-weather');
let h2 = document.querySelector('h2')

// Creating the element for the weather icon
let weatherIcon = document.createElement('img');


// Adding an event listener to formWeather, so when clicking on the search-button, the following code will execute, depending on the input from the user
formWeather.addEventListener('submit', selectCity);

function selectCity(e) {

    // Method that prevents the default actions for the event to happen
    e.preventDefault();

    // Selection the first input-element from the HTML and saving it to 'input'
    let input = document.querySelector('input')

    // Saves the input from the user to 'inputCity'
    let inputCity = input.value;

    // Sets an empty value to the input-element to ????????
    input.value = '';


    // The URL to the API, with template literals for the input from the user and the API-key
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=metric&appid=${apiKey}`;

    // Function that fetch data from a url
    fetch(url).then(

        function (response) {

            // Returns the data (in .json) from the server when response status code is more than 200 and less than 300
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }

            // If the response from the server has the status code 404(wrong input from the user), an alert with an error messagage will be displayed, a message will be logged in the console and the following function will not be executed. Jumps to catch.
            else if (response.status === 404) {
                alert('The city was not found. Please enter a valid city!')
                throw 'The city was not found';

            }

            // If the response from the server has the status code 401 (something wrong with the api-key), an alert with an error messagage will be displayed, a message will be logged in the console and the following function will not be executed. Jumps to catch
            else if (response.status === 401) {
                alert('The API-key is unvalid')
                throw 'Unvalid API-key'
            }
        }
    ).then(
        // This function will be executed when the input from the user matches a valid city
        function (data) {

            console.log(data)

            /* CITY NAME */
            // The h2 will get the value of the users input
            h2.innerText = inputCity;


            /* COORDINATES */
            // Selects the p-element 'coord' from the HTML
            let coordinatesText = document.querySelector('.coord');

            // Creates variables and sets the value of the coordinates 
            let coordLat = data.coord.lat;
            let coordLong = data.coord.lon;

            // Gives the 'coordinatesText' a string containing the coordinates of the city
            coordinatesText.innerHTML = `Latitude: ${coordLat} - Longitude: ${coordLong}`;


            ////////////////////////////
            //* ICON AND DESCRIPTION *//
            ///////////////////////////

            /* ICON */

            // Selects the class from HTML that contains the div with the icon and descripton-elements
            let weatherBox = document.querySelector('.weather-icon-description-box')

            // Puts the 'weatherIcon in the beginning of the 'weatherBox'-element
            weatherBox.insertAdjacentElement('afterbegin', weatherIcon)

            // Sets the 'iconImg' data to the value of weather icon
            let iconImg = data.weather[0].icon;

            // Sets the value of a new variable (iconUrl) to the url for the icon. The template literal 'iconImg' will select what icon that will be displayed
            let iconUrl = `http://openweathermap.org/img/wn/${iconImg}@2x.png`;

            // Sets the source of the icon to the iconUrl above
            weatherIcon.src = iconUrl;


            /* DESCRIPTION TEXT */

            // Creates a variable for the data-description text from HTML
            let descriptionText = document.querySelector('.data-description');

            // Sets the content of the text to the data value of weather description
            descriptionText.innerHTML = data.weather[0].description;

            ///////////////////
            //* TEMPERATURE *//
            //////////////////

            // Selects the empty p-element 'temp-text' from HTML
            let tempText = document.querySelector('.temp-text');

            // Gives the tempText the value 'Temperature'
            tempText.innerText = 'Temperature:';

            // Selects the empty p-element 'data-text-temp' from HTML
            let tempData = document.querySelector('.data-text-temp');

            // Creates a variable (temp) and gives it the value of data.main.temp
            let temp = data.main.temp;

            // Rounds the temperature to closest integer
            let tempRound = Math.round(temp);

            // Gives tempText the value of the rounded temperature and adding '°C'
            tempData.innerHTML = `${tempRound}°C`;



            /////////////
            //* WIND *//
            ////////////

            // Selects the empty p-element 'wind-text' from HTML
            let windText = document.querySelector('.wind-text');

            // Gives the windText the value 'Wind speed'
            windText.innerText = 'Wind speed:'

            // Selects the empty p-element 'data.text-wind' from HTML
            let windData = document.querySelector('.data-text-wind');

            // Creates a variable (wind) and gives it the value of data.wind.speed
            let wind = data.wind.speed;

            // Rounds the wind speed to closest integer
            let windRound = Math.round(wind);

            // Gives windText the value of the rounded wind and adding 'M/S'
            windData.innerHTML = `${windRound} M/s `;

            /////////////////
            //* HUMIDITY *//
            ////////////////

            // Selects the empty p-element 'humidity-text' from HTML
            let humidityText = document.querySelector('.humidity-text');

            // Gives the humidityText the value of 'Humidity'
            humidityText.innerText = 'Humidity:'

            // Selects the empty p-element 'data-text-humidity' from HTML
            let humidityData = document.querySelector('.data-text-humidity');

            // Gives the 'humidityData' the value of 'data.main.humidity' and adding '%'
            humidityData.innerHTML = `${data.main.humidity}%`;


            ///////////////////////
            //* MAIN-CONTAINER *//
            //////////////////////

            // Changes the background color of the main-container depending on the citys temperature

            let containerBackground = document.querySelector('.main-container')

            // Sets the background color to dark blue
            if (tempRound > -40 && tempRound < 0) {
                containerBackground.style.background = 'rgba(0, 14, 143, 0.400)';

                // Sets the background color to light blue
            } else if (tempRound > 0 && tempRound <= 10) {
                containerBackground.style.background = 'rgba(60, 95, 143, 0.400)';


                // Sets the background color to orange
            } else if (tempRound > 10 && tempRound <= 20) {
                containerBackground.style.background = 'rgba(143, 79, 0, 0.400)';


                // Sets the background color to red
            } else if (tempRound > 20 && tempRound <= 30) {
                containerBackground.style.background = 'rgba(143, 31, 0, 0.400)';


                // Sets the background color to dark red
            } else if (tempRound > 30 && tempRound < 50) {
                containerBackground.style.background = 'rgba(143, 0, 0, 0.400)';

                // Sets the background color to default
            } else {
                containerBackground.style.background = 'rgba(255, 255, 255, 0.400)';

            }


            ////////////////////////
            //* BODY BACKGROUND *//
            ///////////////////////

            // Changes the bodys background depending on the citys weather-id. The variable 'iconImg' is also use weather icon
            // Sets the transition to two seconds
            function changeBackground() {
                body.style.backgroundImage = `url(/img/${iconImg}.jpg)`;
                body.style.transition = "all 2s";

            }
            changeBackground();

        }

    // Catches the error
    ).catch(
        function (error) {
            // Logs the error message to the console
            console.log(error)

        }
    )
}

///////////////////////
//* RESET FUNCTION *//
//////////////////////

// Selects the input text area from HTML
let inputCity = document.querySelector('#input-city');

// Adds an eventlistener with the event of click and the function 'resetWeatherData
inputCity.addEventListener('click', resetWeatherData)

// This function resets the data for daily weather

function resetWeatherData() {
    cityTextDefault();
    coordDefault();
    descriptionDefault();
    tempDefault();
    windDefault();
    humidityDefault();
}

function inputCityDefault() {
    let inputCity = document.querySelector('#input-city');
    inputCity.reset();
}

function cityTextDefault() {
    let cityText = document.querySelector('.city-name')
    cityText.innerHTML = null;
}

function coordDefault() {
    let cityText = document.querySelector('.coord')
    cityText.innerHTML = null;
}

function descriptionDefault() {
    weatherIcon.src = '';

    let descriptionText = document.querySelector('.data-description');
    descriptionText.innerHTML = null;
}

function tempDefault() {
    let tempText = document.querySelector('.temp-text');
    tempText.innerHTML = null;

    let tempData = document.querySelector('.data-text-temp');
    tempData.innerHTML = null;
}

function windDefault() {
    let tempText = document.querySelector('.wind-text')
    tempText.innerHTML = null;

    let windData = document.querySelector('.data-text-wind');
    windData.innerHTML = null;
}

function humidityDefault() {
    let tempText = document.querySelector('.humidity-text')
    tempText.innerHTML = null;

    let humidityData = document.querySelector('.data-text-humidity');
    humidityData.innerHTML = null;
}


