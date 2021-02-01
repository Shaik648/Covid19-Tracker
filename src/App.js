import React, { useState, useEffect } from "react";
import "./styles.css";
import {
  MenuItem,
  Select,
  FormControl,
  Tab,
  CardContent,
  Card,
  Typography
} from "@material-ui/core";
import InfoCard from "./InfoCard";
import Table from "./Table";
import { sortData } from "./utlitis";
// import { Card, CardContent, Typography } from "@material-ui/core";
export default function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  console.log("tabel", tableData);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          console.log("data-1-", data);

          const countiress = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countiress);
          // console.log("data", data);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("Code", countryCode);

    const url =
      countryCode == "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        // console.log("countyrInfo=", data);
        setCountry(countryCode);
      });
    // setCountry(countyCode);
  };

  return (
    <div className="App">
      <div className="Header">
        <h1> Covid Tracker </h1>

        <FormControl className="app__left">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>
                {/* {console.log("country", country)} */}
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="infocard__box">
          <InfoCard
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoCard
            title="Recoverd"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoCard
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
          <Card>
            <p>Daily wise </p>
            <CardContent>
              <Table countries={tableData} />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="table_data"></div>
    </div>
  );
}
