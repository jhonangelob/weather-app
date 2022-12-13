import { useRef, useState } from 'react';
import { BsCloudDrizzle } from 'react-icons/bs';
import { GrSearch } from 'react-icons/gr';
import { WiHumidity, WiRain, WiRainWind, WiThermometer } from 'react-icons/wi';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const [weather, setWeather] = useState(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      getLocation(position.coords.latitude, position.coords.longitude).then(
        (result) => {
          setLoading(false);
          setWeather(result);
        }
      );
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const searchLocation = inputRef.current.value.trim();
    getWeather(searchLocation)
      .then((result) => getLocation(result.latitude, result.longitude))
      .then((result) => {
        setWeather(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

    e.target.reset();
  };

  const getWeather = async (searchLocation) => {
    const data = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchLocation}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
    );
    const coordinates = await data.json();
    return { latitude: coordinates[0].lat, longitude: coordinates[0].lon };
  };

  const getLocation = async (latitude, longitude) => {
    const location = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const result = await location.json();
    return result;
  };

  return (
    <div className='App flex flex-col bg-bg-color min-h-screen justify-center items-center gap-6 md:w-3/4 md:mx-auto'>
      <div className='flex flex-row bg-white-color w-4/5 rounded-sm text-left p-4 gap-2 shadow-md'>
        <div className='w-2/4'>
          <h3 className='text-xl font-bold'>
            {loading ? 'Fetching data...' : weather && weather.weather[0].main}
          </h3>
          <p className='text-sm font-medium text-secondary-color'>
            {loading
              ? 'Loading...'
              : weather && `${weather.name}, ${weather.sys.country}`}
          </p>
          <h1 className='text-6xl font-bold text-primary-color'>
            {loading
              ? 'No data'
              : weather && (weather.main.temp - 273.15).toFixed(0) + '°C'}
          </h1>
        </div>
        <div className='flex flex-col w-2/4 justify-between items-end gap-2'>
          <BsCloudDrizzle className='w-14 h-14 text-accent-color' />
          <p className='text-sm text-secondary-color'>
            {loading
              ? 'Getting weather description...'
              : weather && weather.weather[0].description}
          </p>
        </div>
      </div>
      <div className='grid grid-cols-4 w-4/5 gap-3 md:grid-cols-8'>
        <div className='flex flex-row bg-white-color rounded-sm  col-span-2 shadow-md py-4 px-2'>
          <WiThermometer className='w-10 h-10 text-accent-color my-auto' />
          <div className='w-4/5'>
            <h1 className='text-sm text-primary-color'>Feels Like</h1>
            <p className='text-lg font-bold '>
              {loading
                ? '...'
                : weather &&
                  (weather.main.feels_like - 273.15).toFixed(0) + '°C'}
            </p>
          </div>
        </div>
        <div className='flex flex-row bg-white-color rounded-sm  col-span-2 shadow-md py-4 px-2'>
          <WiHumidity className='w-10 h-10 text-accent-color my-auto' />
          <div className='w-4/5'>
            <h1 className='text-sm text-primary-color'>Humidity</h1>
            <p className='text-lg font-bold'>
              {loading ? '...' : weather && weather.main.humidity + '%'}
            </p>
          </div>
        </div>
        <div className='flex flex-row bg-white-color rounded-sm  col-span-2 shadow-md py-4 px-2'>
          <WiRain className='w-10 h-10 text-accent-color my-auto' />
          <div className='w-4/5'>
            <h1 className='text-sm text-primary-color'>Pressure</h1>
            <p className='text-lg font-bold'>
              {loading ? '...' : weather && weather.main.pressure + 'hPa'}
            </p>
          </div>
        </div>
        <div className='flex flex-row bg-white-color rounded-sm  col-span-2 shadow-md py-4 px-2'>
          <WiRainWind className='w-10 h-10 text-accent-color my-auto' />
          <div className='w-4/5'>
            <h1 className='text-sm text-primary-color'>Wind Speed</h1>
            <p className='text-lg font-bold'>
              {loading ? '...' : weather && weather.wind.speed + 'm/s'}
            </p>
          </div>
        </div>
      </div>

      <form
        className='flex bg-white-color rounded-sm items-center w-4/5 p-4 shadow-md'
        onSubmit={handleSubmit}
      >
        <input
          className='w-11/12 bg-white-color text-sm px-2 py-1 active:outline-none focus:outline-none'
          ref={inputRef}
          type='text'
          placeholder='Search City'
        />
        <button
          className='flex w-1/12 items-center justify-center'
          type='submit'
        >
          <GrSearch className='h-5 w-5 color-gray' />
        </button>
      </form>
    </div>
  );
}

export default App;
