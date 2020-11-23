# Kunskapskontroll2-Emma-Olsson
Weather app


/* 
- All info ska presenteras i metric units
- Ett formulär med en text-input och en submit-knapp där användaren anger en stad.
- Det nuvarande vädret för den inmatade staden hämtas och  presenteras. 
Du behöver ha med följande: 
- Description
- Väderikon, se https://openweathermap.org/weather-conditions 
- Temperatur
- Vindhastighet
- Luftfuktighet
- Temperaturdatan ska användas för att ändra färg på något i appen. Kan vara hela bakgrunden eller en liten ikon, du väljer själv.
- Utifall den inmatade staden inte kan hittas ska det visas ett tydligt och informerande meddelande.
Kommentera all kod med beskrivning av vad den gör
 */

 This application gives you the current weather data of the city of your selection.
 You enter the city of your choice in the input-box and the application gives you the following information when entering the city and clicking the search-button:

 - Title with the city you entered.

 - The coordinates of the city.

 - Description of weather, for example: 'Few clouds', 'Clear sky', 'Light rain', etc.

 - Weather icon that changes depening on the weather-id that is collected from the api. 

 - The background of the website will also change depening on the weather-id collected from the api.

 - Temperature is shown in the metric unit, celsius. The background of the information containing all weather data, changes depending on the temperature. For example a dark blue color if the temperature is less than 0 degrees celsius and an orange color if the temperatrure is between plus 10 and 20 degrees.

 - The wind speed is shown in the metric unit 'meters per second'.

- The humidity is shown in percentage.

When clicking on the input field while showing current weather information, the input text area and the associated information will be se to default.

Error handling
- The user will get an alert message if the city does not exist and a message will be logged in the console. Error message 404.

- The user will get an alert message if the API-key is unvalid and a message will be logged in the console. Error message 401.