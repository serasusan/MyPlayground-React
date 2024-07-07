import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloudy_icon from '../assets/cloud.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import { useEffect,useState,useRef } from 'react'

const Weather = () => {
  
  const inputRef = useRef();
  const [weatherdata, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

  const search = async (city) => {
  if(city === '') return alert('Please enter a city name');
    try{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok) 
        {
          alert(data.message);
          return;
        }
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed : data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: allIcons[data.weather[0].icon] || clear_icon
      })
    }
    catch(error){
      setWeatherData(false);
      console.error(error);
    }
  }

  useEffect(() =>{
    search('New York');
  
  },[])
  return (
    <div className='weather'> 
        <div className="search-bar">
            <input type="text" ref={inputRef} placeholder='Search'/>
            <img src={search_icon} alt="search" onClick={()=> search(inputRef.current.value)} />
        </div>
        {weatherdata?<>
        
        <img src={weatherdata.icon} alt="" className='weather-icon' />
          <p className='temperature'>{weatherdata.temperature}°C</p>
          <p className='location'>{weatherdata.location}</p>
          <div className="weather-data">
          <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{weatherdata.humidity} %</p>
                  <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                  <p>{weatherdata.windSpeed} km/hr</p>
                  <span>Wind Speed</span>
                </div>
            </div>
          </div>
        </>:<></>}
    </div>
  )
}

export default Weather