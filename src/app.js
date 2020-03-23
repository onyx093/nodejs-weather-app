const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set static directories to serve
app.use(express.static(publicDirectoryPath));

//Home page route
app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Olaleye Obidiya'
    });
});

//About page route
app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Olaleye Obidiya'
    });
});

//Weather page route
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must specify an address'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if(error){
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastResponse) => {
            if(error){
                return res.send({
                    error
                });
            }
            res.send({
                forecast : forecastResponse,
                location,
                address : req.query.address
            });
        });
    });
});


//Sample query string
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : 'You need to provide a search term'
        });
    }
    console.log(req.query.search);
    
    res.send({
        products : []
    });
});

//Help page route
app.get('/help', (req, res) => {
    res.render( 'help', {
        title : 'Help',
        name : 'Olaleye Obidiya',
        helpText : 'This is some helpful text'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : 'My 404 page',
        errorText : 'Help article not found',
        name : 'Olaleye Obidiya'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title : 'My 404 page',
        errorText : 'Page not found',
        name : 'Olaleye Obidiya'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
    
});