import React, { useContext, useState } from 'react'
import { FIND_WEATHER, SEARCH_CITY } from '../../constant/Actions';
import { findWeather, searchCity } from '../../services/weather';
import { WeatherContext } from '../../Context/WeatherContext';
import styles from './home.module.css'
import Alert from '../Alert/Alert';

const Home = ({ dispatch }) => {
  const state = useContext(WeatherContext);
  const [error, setError] = useState(false)
  const [value, submitAction, isPending] = React.useActionState(
    async (previousState, formData) => {
      let city = formData.get("search")
      if (city.length > 0) {

        const res = await searchCity(city)

        if (res?.data) {
          if ([...res.data.list].length == 0) {
            setError(true)
            dispatch({
              type: SEARCH_CITY, payload: {
                city: city,
                cityList: [],
              }
            });
            return null
          }
          setError(false)
          dispatch({
            type: SEARCH_CITY, payload: {
              city: city,
              cityList: res?.data?.list,
            }
          });
          return res;
        }
      }

      return ""
    },
    "",
  );

  const handleFindWeather = async (coord) => {
    const res = await findWeather(coord)
    if (res?.data) {
      dispatch({
        type: FIND_WEATHER, payload: {
          cityList: [],
          temp: 0, humidity: null, weatherCondition: null,
          currentWeather: res.data?.current
        }
      });
    }
  }


  return (
    <>
      <div style={{ padding: "20px 50px", display: "flex", flexDirection: "column", rowGap: 20 }}>
        <h2 className={styles['title']}>Weather App</h2>
        <div style={{ display: "flex", flexDirection: "column", }}>
          <form action={submitAction}>
            <div style={{ display: "flex", columnGap: 10 }}>
              <input className={styles['search-input']} type='text' placeholder='Search by city name...' name='search' />
              <button type='submit' disabled={isPending}>Search</button>
            </div>
          </form>
          {[...state.cityList].length > 0 && <p>Please select any One</p>}
          <ul>
            {[...state.cityList].map((item, i) => {
              return <li key={i} className={styles['ist-item']} onClick={() => handleFindWeather(item?.coord)}>{`${item?.name},${item?.sys?.country}`}</li>
            })}
          </ul>
          {!error && state?.currentWeather && <>
            <div style={{ display: "flex", columnGap: 10 }}>
              <div>Temperature :</div>
              <div>{state?.currentWeather?.temp}</div>
            </div>
            <div style={{ display: "flex", columnGap: 10 }}>
              <div>Humidity :</div>
              <div>{state?.currentWeather?.humidity}</div>
            </div>
            <div style={{ display: "flex", columnGap: 10 }}>
              <div>Weather Conditions :</div>
              <div>{`Feels like ${state?.currentWeather?.feels_like}, ${state?.currentWeather?.weather?.[0]?.description}`}</div>
            </div>

          </>
          }
          {error && <Alert>Search result not found</Alert>}
        </div>
      </div>
    </>
  );
}

export default Home