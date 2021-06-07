import React, { useState } from 'react';
import './App.css';
import Cards from './components/Cards';
import Nav from './components/Nav';

export default function App() {

  const [cities, setCities] = useState([]);
  const { apiKey } = process.env;

  function onSearch(pueblito) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${pueblito}&appid=${apiKey}&units=metric`)
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
            alert("La ciudad ya está!")
          } else {
            setCities(oldCities => [...oldCities, pueblito]);
          }
        } else {
          alert("ciudad no encontrada");
        }
      });

  }

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
