import React, { useState, useEffect } from "react";
import "./styles.css";
import { MenuItem, Select, FormControl } from "@material-ui/core";
import InfoCard from "./InfoCard";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    getCountriesData();
  }, []);

  const getCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countiress = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2
        }));
        setCountries(countiress);
        // console.log("data", data);
      });
  };

  const onCountryChange = (event) => {
    const countyCode = event.target.value;
    console.log("Code", countyCode);
    setCountry(countyCode);
  };

  return (
    <div className="App">
      <div className="Header">
        <h1> Covid Tracker </h1>

        <FormControl className="app__left">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div clasName="infocard__box">
          <InfoCard />
          <InfoCard />
          <InfoCard />
        </div>
      </div>
    </div>
  );
}
