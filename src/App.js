import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Register from "./register";
import SignIn from "./signin";
import SearchPanel from "./hotelsearchbar";
import HotelCard from "./HotelCard";
import Hotel from "./hotel";
import FlightSearchBar from "./flight/flight_search_bar";
import OffersCarousel from "./offer_section/offer";
import "./css/main.css";
import Check from "./flight/check.js"


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();
  const [comment,setcomments]=useState([]);
  const [newcomments,setnewcomments]=useState("")

  const handlecommentbtn = () => {
    if (newcomments.trim()!== ""){
    setcomments([...comment, newcomments]);
    setnewcomments("")
  }
};
  const handleSignIn = (token) => {
    setIsAuthenticated(true);
    setToken(token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    navigate("/signin");
  };

  useEffect(() => {
    if (city) {
      fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city}"}`,
        {
          headers: {
            projectId: "tytpcwxgpttd",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setHotels(data.data.hotels);
        })
        .catch((error) => {
          setHotels([]);
          console.error("Error fetching hotels:", error);
        });
    }
  }, [city]);

  const handleCitySelect = async (city) => {
    setCity(city);
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedHotels = [...hotels];

    if (option === "ratingHigh") {
      sortedHotels.sort((a, b) => b.rating - a.rating);
    } else if (option === "ratingLow") {
      sortedHotels.sort((a, b) => a.rating - b.rating);
    } else if (option === "priceHigh") {
      sortedHotels.sort((a, b) => b.avgCostPerNight - a.avgCostPerNight);
    } else if (option === "priceLow") {
      sortedHotels.sort((a, b) => a.avgCostPerNight - b.avgCostPerNight);
    }

    setHotels(sortedHotels);
  };

  return (
    <div><Routes>
     <Route path="/" element={<Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
      />
      <Route path="/f" Component={FlightSearchBar} />
<Route path="/offer" Component={OffersCarousel}/>
        <Route path="/hotel" Component={Hotel}/>
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        <Route
          path="/register"
          element={<Register onRegister={() => navigate("/signin")} />}
        />
        <Route path="/k" Component={Check}/>
        
          
      </Routes>
    </div>
  );
};

export default App;














