import { useState, useEffect } from 'react';

const WeatherCard = ({ weather, temp, loading, error, errorMessage }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    setIsCelsius(true);
    const weatherToBackground = {
      '01d': '1.1.png',
      '01n': '1.png',
      '02d': '2.png',
      '02n': '2.2.png',
      '03d': '3.3.png',
      '03n': '3.png',
      '04d': '4.4.png',
      '04n': '4.png',
      '09d': '5.png',
      '09n': '5.5.png',
      '10d': '6.png',
      '10n': '6.6.png',
      '11d': '7.7.png',
      '11n': '7.png',
      '13d': '8.8.png',
      '13n': '8.png',
      '50d': '9.9.png',
      '50n': '9.png',
      
    };

    
    const weatherDescription = weather?.weather[0].icon;
    const backgroundFileName = weatherToBackground[weatherDescription];
    const backgroundUrl = `/${backgroundFileName}`;
    
    setBackgroundImage(`url(${backgroundUrl})`);
  }, [weather]);

  const handleChangeTemp = () => {
    setIsCelsius(!isCelsius);
  };

  if (loading) {
    return (
      <span className="loading-screen">
        <p className="loading-text">Cargando datos...</p>
      </span>
    );
  }
  
  if (error) {
    return (
      <div className="error-message">
        <p className="error-message_p">{error}</p>
      </div>
    );
  }
  
  if (errorMessage) {
    return (
      <div className="error-message">
        <p className="error-message_p">{errorMessage}</p>
      </div>
    );
  }
  
  
  

  return (

  <div className="background" style={{ backgroundImage: backgroundImage }}>
      <article>
        <h1 className='container_app_title1' >Weather App</h1>
        <div className="container_weather">
          <h2 className="container_title2">{weather?.name}, {weather?.sys.country}</h2>
          <h2 className="container_title_2">"{weather?.weather[0].description}"</h2>
            <div className="container_weather_image">
              <img className="container_weather_image_1" src={weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
            </div>
          <section className="container_weather_container">
            <ul className="container_weather">
              <li className="container_weather_li">
                <span className="container_weather_span_t">Wind Speed:</span>
                <span className="container_weather_span_c"> {weather?.wind.speed} m/s</span>
              </li>
              <li className="container_weather_li">
                <span className="container_weather_span_t">Clouds:</span>
                <span className="container_weather_span_c"> {weather?.clouds.all} %</span>
              </li>
              <li className="container_weather_li">
                <span className="container_weather_span_t">Pressure:</span>
                <span className="container_weather_span_c"> {weather?.main.pressure} hPa</span>
              </li>
            </ul>
          </section>
        </div>
        <h2 className="container_weather_title1">{isCelsius ? `${temp?.celsius} °C` : `${temp?.fahrenheit} °F`}</h2>
        <button className="container_button" onClick={handleChangeTemp}>
          {isCelsius ? 'Change to °F' : 'Change to °C'}
        </button>
      </article>
  </div>
    
  );
};

export default WeatherCard;
