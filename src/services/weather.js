import axiosInstance from "./axiosInstance"

export const searchCity = (city) => {
    return axiosInstance.get('/data/2.5/find', {
        params: {
            'q': city,
            'appid': process.env.REACT_APP_API_KEY,
            'units': 'metric'
        }
    })
}

export const findWeather = (coord) => {
    console.log("coord", coord)
    return axiosInstance.get('/data/2.5/onecall', {
        params: {
            'lat': coord?.lat,
            'lon': coord?.lon,
            'appid': process.env.REACT_APP_API_KEY,
            'units': 'metric',
        }

    })
}