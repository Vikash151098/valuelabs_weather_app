import { useReducer } from 'react';
import Home from './view/Home/Home';
import { weatherReducer } from './controller/weatherReducer';
import { WeatherContext } from './Context/WeatherContext';
import './App.module.css'

const initState = { city: "", cityList: [], temp: 0, humidity: null, weatherCondition: null, currentWeather: null }

function App() {
  const [state, dispatch] = useReducer(weatherReducer, initState);

  return (
    <>
      <WeatherContext value={state}>
        <Home dispatch={dispatch} />
      </WeatherContext>
    </>
  );
}

export default App;
