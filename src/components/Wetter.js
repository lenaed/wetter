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
        let city = document.getElementById("city").value;
        this.getWeather(city);
    }
    getWeather(city) {
        const url = API_URL + "?q=" + city + ",de&lang=de&units=metric&APPID=" + API_KEY;
        axios
            .get(url)
            .then(res => {
                if(parseInt(res.data.cod) === 200) {
                    this.setState({weather: res.data, error: null})
                    let temp = this.state.weather.main.temp;
                    let container = document.querySelector('.container');

                    if(temp >= 18) {
                        container.className = "container sommer";
                    } else {
                        container.className = "container winter";
                    }
                }
            })
            .catch(err => {
                if(err.response) {
                    this.setState({weather: null, error: err.response.data.message})
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
        let temp = parseInt(w.main.temp);
        let description = w.weather[0].description;
        let sunrise = new Date(w.sys.sunrise * 1000).toLocaleTimeString();
        let sunset =  new Date(w.sys.sunset * 1000).toLocaleTimeString();
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
