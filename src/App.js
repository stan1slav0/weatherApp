import React, { useState } from "react";
import axios from 'axios'


function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=49a2ad8bc7b7c860d1da5b861a8f7ce7&units=metric`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(URL)
        .then(res => {
          setData(res.data);
          console.log(res.data);
          setErrorMsg('')
        })
        .catch(error => {
            setErrorMsg('City not found')
            setData(null)
        });
        
      setLocation('');
    }
  }


  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter location"
          type="text"
        />
      </div>
      {errorMsg && <h3 className="error">{errorMsg}</h3>}

      {data && (
        <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}{data.sys?.country && `, ${data.sys.country}`}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.round(data.main.temp)}  &#8451;</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
       {data.name &&  
       <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{Math.round(data.main.feels_like)}  &#8451;</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed}  m/s</p> : null}
            <p>Wind</p>
          </div>
        </div>}
      </div>
      )}
    </div>
  );
}

export default App;
