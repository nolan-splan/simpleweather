const express = require('express');
var bodyParser = require('body-parser');
const path    = require('path');
const app     = express();
const port    = process.env.PORT || 3000;
const fs      = require('fs');
// import the existing weather data
const weatherData = require('./weather.json');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/weatherdata', (req, res) => {
  res.sendFile(path.join(__dirname, 'weather.json'));
});
app.post('/write_weather', (req, res) => {
  const date = Date.now();
  // parse the existing weather data into a new object
  // const newWeatherData = JSON.parse(weatherData)
  // append a new key (time right now) to existing weather data
  weatherData[date] = req.body;

  // write the new weather data
  // This'll probably take longer and longer with the growing file
  fs.writeFileSync('weather.json', JSON.stringify(weatherData, null, 2));
  res.send('received json');
})

app.get('/download', function(req, res){
  const file = `${__dirname}/weather.json`;
  res.download(file);
});

app.listen(port, () => console.log(`app is listening on port ${port}`));