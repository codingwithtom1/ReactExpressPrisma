import { Router } from 'express';
import { auth, AuthRequest } from '../middleware/auth';

const weatherRouter = Router();

function randomInt (min:number, max:number) {
    return Math.floor (Math.random () * (max - min + 1) + min);
  }
  
  // Define a function to convert Celsius to Fahrenheit
  function celsiusToFahrenheit (celsius:number) {
    return (celsius * 9 / 5) + 32;
  }
  
  // Define an array of possible weather summaries
  const summaries = [
    'Sunny',
    'Cloudy',
    'Rainy',
    'Snowy',
    'Windy',
    'Foggy',
    'Stormy'
  ];

weatherRouter.get("/", (req, res) => {
	let forecasts = [];
  // Loop 5 times to generate 5 forecast objects
  let dateoffset = 1;
  for (let i = 0; i < 5; i++) {
    // Generate a random date in the next 10 days
    let date = new Date ();
    date.setDate (date.getDate () + dateoffset);
    dateoffset = dateoffset + 1;
    // Generate a random Celsius temperature between -20 and 30
    let temperatureC = randomInt (-20, 30);

    // Convert the Celsius temperature to Fahrenheit
    let temperatureF = celsiusToFahrenheit (temperatureC);

    // Pick a random weather summary from the array
    let summary = summaries [randomInt (0, summaries.length - 1)];

    // Create a forecast object with the generated data
    let forecast = {
      date: date.toISOString ().slice (0, 10), // Format the date as YYYY-MM-DD
      temperatureC: temperatureC,
      temperatureF: temperatureF,
      summary: summary
    };

    // Push the forecast object to the array
    forecasts.push (forecast);
  }

  // Send the array as a JSON response
  res.json (forecasts);
});

export default weatherRouter;