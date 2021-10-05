const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')

const app = express()

const rootDirectory = path.join(__dirname, '..')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(rootDirectory))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
  res.render('index', {
    title: "Your Daily Weather"
  })
})

app.get('/weather', (req, res) => {
  res.render('weather', {
    title: "Your Daily Weather"
  })
})

app.get("/weatherData", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  const city = req.query.address;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=54242f867b58e14cd722bc23728c12ec`;

  request({
      url: url,
      json: true,
    },
    (error, response) => {

      try {
        const data = response.body;
        const temp = data.main.temp;
        const humidity = data.main.humidity;

        res.render('weatherData', {
          city: city,
          temp: temp,
          humidity: humidity,
        });
      } catch (err) {

        return res.render('404')

      }
    }
  );
});


app.get('/about', (req, res) => {
  res.render('about', {
    title: "Your Daily Weather"
  })
})

app.get('*', (req, res) => {
  res.render('404')
})

app.listen(8080)