const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

//Define paths for express configuration
const publicdirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Sethup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicdirectorypath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shubham'


    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About Me',
        name: 'Shubham Sikarwar'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Ham khud yahaan express kisi doosre se padh rhe h aapki help nhi ho paayegi',
        title: 'Help',
        name: 'Shubham Sikarwar'

    })
})


app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })

    }
    //the default value of latitude,longitude and placeName is fixed by ={}
    geocode(req.query.address,(error, {latitude, longitude, placeName}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                placeName,
                address: req.query.address

            })
        })

    })
    // res.send({
    //     weather: 'It is snowing',
    //     mausam: 'Thanda-Thanda',
    //     address: req.query.address 
    // })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shubham Sikarwar',
        errorMessage: 'Help Page not found'

    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Shubham Sikarwar',
        errorMessage: 'Page not found'
         
    })
})


app.listen(3000, () => {
    console.log('server is on the port 3000!')
})