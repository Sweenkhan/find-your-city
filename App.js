import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [contries, setContries] = useState([]);
  const [states, setStates] = useState([]);
  const [cites, setCities] = useState([]);
  const [selectedContry, setSelectedContry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [addedData, setAddedData] = useState([]);
  const [isprintData, setIsprintData] = useState(false);
  // const [cities, setCities] = useState([])

  let API_KEY = "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==";
  

     // 1         -----------     ALL COUNTRIES

  useEffect(() => {
    let config = {
      method: "get",
      url: "https://api.countrystatecity.in/v1/countries",
      headers: {
        "X-CSCAPI-KEY": "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==",
      },
    };

    axios(config)
      .then((result) => {
        setContries(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  // 2   -----------  ALL STATES BY YOUR COUNTRY NAME

  useEffect(() => {
    let configState = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${selectedContry}/states`,
      headers: {
        "X-CSCAPI-KEY": "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA=="
      },
    };
    axios(configState)
      .then((result) => {
        setStates(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedContry]);



  //3     ------------------ ALL CITIES BY YOUR STATE NAME
  useEffect(() => {
    let configCities = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${selectedContry}/states/${selectedState}/cities`,
      headers: {
        "X-CSCAPI-KEY": "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA=="
      },
    };

    axios(configCities)
      .then((result) => {
        console.log(JSON.stringify(result.data));
        setCities(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedState]);




  //    ------------Adding Data to an array

  function addData(e) {
    e.preventDefault();
    setAddedData((addedData) => [
      ...addedData,
      [selectedContry, selectedState, selectedCity],
    ]);
  }
  console.log(addedData);


  //      -------Printing data
  function printData(e) {
    e.preventDefault();
    setIsprintData(true);
  }

  
  //    ------------checking city
  function noCity() {
    if (cites.length === 0) {
      setSelectedCity("NA")
      alert("there is no city!");
    }
  }

  return (
    <div className="checkCity">
      <select
        onChange={(e) => setSelectedContry(e.target.value)}
        defaultValue="placeholder"
      >
        <option value="placeholder" defaultChecked disabled>
          Choose Contry
        </option>
        {contries.map((country, index) => {
          return (
            <option value={country.iso2} key={index}>
              {country.name}
            </option>
          );
        })}
      </select>

      <select
        onChange={(e) => setSelectedState(e.target.value)}
        defaultValue="placeholder"
      >
        <option value="placeholder" defaultChecked disabled>
          Select State
        </option>
        {states.map((state, index) => {
          return (
            <option value={state.iso2} key={index}>
              {state.name}
            </option>
          );
        })}
      </select>

      <select
        defaultValue="placeholder"
        onClick={noCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value="placeholder" defaultChecked disabled>
          select City
        </option>

        {cites.map((city, index) => {
          return (
            <option key={index} value={city.name}>
              {city.name}
            </option>
          );
        })}
      </select>
      <button onClick={addData}>Add</button>
      <button onClick={printData}>Print Data</button>
      <table>
        <th>
          <td>Country</td>
          <td>State</td>
          <td>City</td>
        </th>
        {isprintData &&
          addedData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
}

export default App;
