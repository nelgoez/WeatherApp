import React, { useEffect, useState } from 'react';
import './App.css';
import Cards from './components/Cards';
import Nav from './components/Nav';
import Swal from 'sweetalert2';

/* eslint-disable */

export default function App() {

  const cords = navigator.geolocation.getCurrentPosition(function(position) {
    let locationCords = position.coords ? {lon: position.coords.longitude, lat: position.cords.latitude} : null;
    return locationCords
  }, err => {
    Swal.fire('Error!', err.message, 'error');
  return null})

  const defaultCities = ['londres', 'irlanda', 'Hong Kong', 'China', 'Córdoba' ]

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
  
  function onSearchCords(cords) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cords.lat}&lon=${cords.lon}&appid=${REACT_APP_APIKEY}&units=metric`)
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


  useEffect(() => {
    defaultCities.map(c => onSearch(c))
  }, [])

  useEffect(() => {
    if (cords) onSearchCords(cords)
  }, [cords])

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
