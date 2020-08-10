const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e7572556480e588907e53a0b1925e4cd&query=' + latitude + ',' + longitude + '&units=m'


    request({
        url,

        json: true
    }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect weather service!', undefined)

        } else if (body.error) {
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degrees, but it feels like ' + body.current.feelslike)


        }

    })


}

module.exports = forecast