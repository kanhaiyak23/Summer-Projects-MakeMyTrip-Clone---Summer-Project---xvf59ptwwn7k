import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import {format} from 'date-fns'

import HotelCard from './HotelCard' 
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";

const today = new Date() ;
const HotelSearchBar = ({ onCityClick = () => {} }) => {
  const [location, setLocation] = useState("delhi");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const navigate = useNavigate();

  const handleCityClick = (city) => {
    setSelectedCity(city.cityState.split(",")[0]);
    setDropdownVisible(false);
    

  };
  const handleSearch = () => {
    
    
    onCityClick(selectedCity); 
    navigate('/hotel')
    
  };
 

  const [cities, setCities] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomGuest, setRoomGuest] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const checkInInputRef = useRef(null);
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10); // Format to yyyy-mm-dd
    setCheckIn(formattedDate);
  }, []);
  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      weekday: "long",
    };
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "short" });
    const year = dateObj.getFullYear().toString().substr(-2);
    const weekday = dateObj.toLocaleString("default", { weekday: "long" });
    return `${day} ${month}'${year}
    \n
    ${weekday}`;
  };
  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/city",
        {
          headers: {
            projectId: "tytpcwxgpttd",
          },
        }
      );
      const data = await response.json();

      setCities(data.data.cities);
      console.log(selectedCity)
    };
    fetchCities();
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-green-400 to-blue-500 shadow-lg p-6 mx-auto mt-8 w-full max-w-6xl  rounded-lg r">
      <div className="inset-x-0 flex justify-center relative bottom-14">
        <div className="flex bg-white rounded-lg overflow-hidden shadow-md ">
          <Link
            to="/flights"
            className="flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition duration-200"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/256/7893/7893974.png"
              className="h-10"
              alt="Flights"
            />
            <div className="absolute mt-10 text-sm mx-1 mr-0 text-black">
              Flights
            </div>
          </Link>
          <Link
            to="/hotel"
            className="flex items-center space-x-2 px-4 py-2 text-black hover:text-blue-600 hover:bg-blue-50 transition duration-200"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-UuW9fOZL36o3zxS1MNplEIpIA29uz1QTQ&s"
              className="h-10"
              alt="Hotels"
            />
            <div className="absolute mt-10 text-sm mx-0.5 mr-0 text-black">
              Hotels
            </div>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div className="relative col-span-1 border-r border-gray-300 hover:bg-blue-100 transition duration-200 rounded-lg">
          <span className="text-sm text-gray-600 block mb-1">
            City, Property Name Or Location
          </span>
          <div
            className="w-full p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-bold hover:underline"
            onClick={() => setDropdownVisible(!isDropdownVisible)}
          >
            {selectedCity || "City, Property Name Or Location"}
            {selectedCity && <div className="text-sm text-gray-500">India</div>}
          </div>
          {isDropdownVisible && (
            <div className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded bg-white shadow-lg z-10">
              <ul className="list-none m-0 p-0">
                {cities.map((city) => (
                  <li
                    key={city._id}
                    className="p-2 text-gray-700 hover:bg-blue-200 cursor-pointer text-lg transition duration-200"
                    onClick={() => handleCityClick(city)}
                  >
                    {city.cityState.split(",")[0]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="col-span-1 border-r border-gray-300">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative col-span-1 border-r border-gray-300">
          <span className="text-sm text-gray-600 block mb-1">Check In</span>
          
        </div>
        </div>
        <div className="col-span-1 border-r border-gray-300">
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="col-span-1 border-r border-gray-300">
          <select
            value={roomGuest}
            onChange={(e) => setRoomGuest(e.target.value)}
            className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">1 Room, 1 Guest</option>
            <option value="2">1 Room, 2 Guests</option>
            <option value="3">2 Rooms, 2 Guests</option>
          </select>
        </div>
        <div className="col-span-1 border-r border-gray-300">
          <select
            value={pricePerNight}
            onChange={(e) => setPricePerNight(e.target.value)}
            className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="0-1500">0-1500</option>
            <option value="1500-2500">1500-2500</option>
            <option value="2500-3500">2500-3500</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center relative top-10">
        <button
          className="bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 rounded text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 transition duration-300 "
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default HotelSearchBar;
