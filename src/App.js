import React, { useEffect, useState } from 'react';
import './App.css';
import Cards from './components/Cards';
import Nav from './components/Nav';
import Swal from 'sweetalert2';

/* eslint-disable */

export default function App() {

  const [coords, setCoords] = useState(null)

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoords({ lon: position.coords.longitude, lat: position.coords.latitude });
    })
  }

  const defaultCities = ['londres', 'irlanda', 'Hong Kong', 'China']

  const [cities, setCities] = useState([]);
  const { REACT_APP_APIKEY } = process.env;

  function onSearch(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${REACT_APP_APIKEY}&units=metric`)
      .then(r => r.json())
      .then((recurso) => {
        if (recurso.main !== undefined) {
          const pueblito = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          if (cities.some(c => c.id === pueblito.id)) {
            Swal.fire('Aviso', 'La ciudad ya está!', 'info', 2500)
          } else {
            setCities(oldCities => [...oldCities, pueblito]);
          }
        } else {
          Swal.fire('Alerta!', "ciudad no encontrada", 'info', 2500);
        }
      });

  }

  function onSearchCoords(coords) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${REACT_APP_APIKEY}&units=metric`)
      .then(r => r.json())
      .then((recurso) => {
        if (recurso.main !== undefined) {
          const pueblito = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          if (cities.some(c => c.id === pueblito.id)) {
            Swal.fire('Aviso', 'Tu ciudad ya está!', 'info', 2500)
          } else {
            setCities(oldCities => [...oldCities, pueblito]);
          }
        } else {
          Swal.fire('Alerta!', "tu ciudad no fué encontrada", 'info', 2500);
        }
      });

  }


  useEffect(() => {
    defaultCities.map(c => onSearch(c))
  }, [])

  useEffect(() => {
    if (coords) {
      console.log(coords)
      onSearchCoords(coords)
    }
  }, [])


  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id));
  }

  return (
    <div className="App">
      <Nav onSearch={onSearch} />
      <Cards onClose={onClose} cities={cities} />
    </div>
  );
}
