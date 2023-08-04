import axios from "axios";
import React, { useEffect, useState } from "react";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import DeleteIcon from "@mui/icons-material/Delete";
import "./App.css";

function App() {
  const [contries, setContries] = useState([]);
  const [states, setStates] = useState([]);
  const [cites, setCities] = useState([]);
  const [selectedContry, setSelectedContry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [addContry, setAddContry] = useState("");
  const [addState, setAddState] = useState("");
  const [addedData, setAddedData] = useState([]);
  const [isprintData, setIsprintData] = useState(false);

  // let API_KEY = "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==";

  // 1         -----------     ALL COUNTRIES

  useEffect(() => {
    let config = {
      method: "get",
      url: "https://api.countrystatecity.in/v1/countries",
      headers: {
        "X-CSCAPI-KEY":
          "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==",
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
        "X-CSCAPI-KEY":
          "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==",
      },
    };
    axios(configState)
      .then((result) => {
        console.log(JSON.stringify(result.data));
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
        "X-CSCAPI-KEY":
          "TjZNU1M4VDR1UUlVeVNDdFlXMVdBWFIzUGs0Q016eXhPY0F0cUZydA==",
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

  //      -------Printing data

  function printData(e) {
    e.preventDefault();
    setIsprintData(true);
    setAddedData((addedData) => [
      ...addedData,
      [addContry, addState, selectedCity],
    ]);
  }
  console.log(addedData);

  //    ------------checking city------------
  function noCity() {
    if (cites.length === 0) {
      setSelectedCity("NA");
      alert("there is no city!");
    }
  }

  //   -----------delete Item----------------
  function deleteItem(e, ind) {
    e.preventDefault();
    const updatedItems = addedData.filter((item, index) => index !== ind);

    return setAddedData(updatedItems);
  }

  //    ---------selecet contry data--------
  function addContryData(e) {
    e.preventDefault();
    let seperate = e.target.value.split(" ");

    setAddContry(seperate.slice(1).join(""));
    setSelectedContry(seperate.slice(0, 1).join(""));
  }

  //   ---------selected state data ----------------
  function addStatedata(e) {
    e.preventDefault();
    let seperate = e.target.value.split(" ");

    setAddState(seperate.slice(1).join(""));
    setSelectedState(seperate.slice(0, 1).join(""));
  }

  return (
    <div className="city-locater">
     
      <div className="container">
      <h2>
        WELCOME TO <span> CITY</span>LOCATOR{" "}
        <TravelExploreIcon className="logo" sx={{ fontSize: 30 }} />
      </h2>
        {/*--------------- contry dropdown---------------- */}
        <div className="all-dropdown">
          <select
            className="one"
            onChange={addContryData}
            defaultValue="placeholder"
          >
            <option value="placeholder" defaultChecked disabled>
              Choose Contry
            </option>
            {contries.map((country, index) => {
              return (
                <option value={[country.iso2 + " " + country.name]} key={index}>
                  {country.name}
                </option>
              );
            })}
          </select>

          {/*--------------- state dropdown---------------- */}
          <select
            className="two"
            onChange={addStatedata}
            defaultValue="placeholder"
          >
            <option value="placeholder" defaultChecked disabled>
              Select State
            </option>
            {states.map((state, index) => {
              return (
                <option value={state.iso2 + " " + state.name} key={index}>
                  {state.name}
                </option>
              );
            })}
          </select>

          {/*--------------- city dropdown---------------- */}
          <select
            className="three"
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
        </div>

        <div className="btns">
          <button onClick={printData}>Print Data</button>
        </div>

        <table>
          <thead>
            <td>Country</td>
            <td>State</td>
            <td>City</td>
          </thead>
          {isprintData &&
            addedData.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td id="deleteIcon">
                    {" "}
                    <button onClick={(e) => deleteItem(e, index)}>
                      <DeleteIcon className="delete"/>
                    </button>
                  </td>
                  {/* <tr> <button onClick={(e) =>editItem(e, index)}>/</button></tr> */}
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}

export default App;
