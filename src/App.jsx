import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userCountry, setUserCountry] = useState(); 
  const [inputValue, setInputValue] = useState(''); 

  useEffect(() => {
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoords(obj);
    };

    const handleError = (err) => {
      console.error('Error al obtener la ubicación:', err.message);
      setLoading(false);
      setError(true);
      if (err.code === 1) {
        
        setErrorMessage('No se otorgaron permisos de ubicación.');
      } else {
       
        setErrorMessage('Hubo un error al cargar los datos.');
      }
    };

    navigator.geolocation.getCurrentPosition(success, handleError);
  }, []);
  

  useEffect(() => {
    if (coords && loading) {
      const apiKey = '581b552bf029acfe937a89b198ff4761';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`;

      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          setError(false);
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            fahrenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1),
          };
          setTemp(obj);
          setLoading(false);
          setUserCountry(res.data.sys.country); // Almacena el país del usuario
        })
        .catch((err) => {
          console.error('Error al obtener datos del clima:', err);
          setError(true);
          setErrorMessage('No se encontraron datos para la ubicación actual.'); 
        })
        .finally(() => setLoading(false));
    }
  }, [coords, loading]);
  
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setErrorMessage(''); 
  };

  const getWeatherForCity = (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      setErrorMessage('Por favor, ingrese una ciudad o país válido.');
      return;
    }

    const apiKey = '581b552bf029acfe937a89b198ff4761';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;

    axios
      .get(url)
      .then((res) => {
        setWeather(res.data);
        setError(false);
        const obj = {
          celsius: (res.data.main.temp - 273.15).toFixed(1),
          fahrenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(1),
        };
        setTemp(obj);
      })
      .catch((err) => {
        console.error('Error al obtener datos del clima:', err);
        setError(true);
        setErrorMessage('No se encontraron datos para la ciudad ingresada.');
      });
  };

  return (
    <div  >
      <div className="container_app">
      <h1 className="container_app_title">Weather App</h1>
      <div className="container_app_card">
        <form className="container_app_card_form" onSubmit={getWeatherForCity}>
          <h2 className="container_app_card_title">Ubicación actual: {userCountry}</h2>
          <input
            className="container_app_card_imput"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button className="container_button" type="submit">
            Search
          </button>
        </form>
      </div>
      </div>

      <div className="error-message-container">
        {errorMessage && (
          <div className="error-message">
            <p className="error-message_p">{errorMessage}</p>
          </div>
        )}

        <WeatherCard
          loading={loading}
          weather={weather}
          temp={temp}
          error={error}
        />
      </div>
    </div>
  );
}


export default App;


