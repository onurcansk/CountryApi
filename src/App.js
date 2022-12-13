import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchCapital, setSearchCapital] = useState("");
  useEffect(() => {
    axios("https://restcountries.com/v2/all")
      .then((res) =>
        searchText
          ? res.data.filter((country) =>
              country.name.toLowerCase().startsWith(searchText.toLowerCase())
            )
          : res.data
      )
      .then((data) =>
        searchCapital
          ? data.filter(
              (country) =>
                country.capital &&
                country.capital
                  .toLowerCase()
                  .startsWith(searchCapital.toLowerCase())
            )
          : data
      )
      .then((data) => setCountries(data));
  }, [searchCapital, searchText]);
  return (
    <div className="App">
      <input
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        placeholder="Aramak istediğiniz ülkeyi giriniz"
      />
      <input
        onChange={(e) => setSearchCapital(e.target.value)}
        value={searchCapital}
        placeholder="Aramak istediğiniz başkenti giriniz"
      />
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Isim</th>
            <th scope="col">Başkent</th>
            <th scope="col">Bayrak</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{country.name}</td>
              <td>{country.capital}</td>
              <td>
                <img
                  style={{ width: "100px" }}
                  src={country.flags.png}
                  alt={country.name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
