import '../assets/css/wetter.css';
import {React, Component} from 'react';
import axios from 'axios';

const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class Wetter extends Component {
    state = {
        weather: null,
        error: null
    }
    onSumit = (e) => {
        e.preventDefault();
        let city = null;
        this.getWeather(city);
    }
    getWeather(city) {
        const url = API_URL + "?q=" + city + ",de&lang=de&units=metric&APPID=" + API_KEY;
        axios
            .get(url)
            .then(res => {
                // @todos:
                // - check response code 200
                // - set states (setState) for weather, error
                // - get temparatur
                // - set container classes for summer if temperatur >= 18 or winter if lower
            })
            .catch(err => {
                if(err.response) {
                    // @todo:
                    // - set setState for error (err.response.data)
                }
            });
    }
    render() {
        return (
            <div className="container">
                <h3>Mein Wetter</h3>
                <form onSubmit={this.onSumit}>
                    <input id="city" className="city" />
                    <button>Suche</button>
                </form>
                <WeatherData weather={this.state.weather} error={this.state.error} />
            </div>
        );
    }
}

function WeatherData(props) {
    const w = props.weather, err = props.error;
    if (err !== null) {
        return (
            <div>
                <h3>{err}</h3>
            </div>
        )
    }
    else if(w !== null) {
        let temp        = null,
            description = null,
            sunrise     = null,
            sunset      = null;

        return (<div className="result">
            <div className="temp">
                <span>{temp} °C</span>
            </div>
            <div className="description">
                <span>{description}</span>
            </div>
            <div className="sun">
                <div><span>Sonnenaufgang  {sunrise} Uhr</span></div>
                <div><span>Sonnenuntergang {sunset} Uhr</span></div>
            </div>
        </div>);
    }
    else {
        return (<div><h5>Bitte einen Ort angeben!</h5></div>)
    }
}
export default Wetter;
