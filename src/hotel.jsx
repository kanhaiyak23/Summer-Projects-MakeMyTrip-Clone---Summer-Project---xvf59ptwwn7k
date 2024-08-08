import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./hotel/hotelnav";
import SearchPanel from "./hotelsearchbar";
import HotelCard from "./HotelCard";

const Hotel = () => {
  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

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
          console.log(data.data.hotels);
          
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
  };

  return (
    <div>
      <Navbar />
      <div>
        <SearchPanel onCityClick={handleCitySelect} />
        <div className="flex bg-blue-300 p-4 mb-4 w-full text-black space-x-11">
          <span className="font-bold ml-5 mr-5 text-lg">Sort By:</span>
          <div className="flex space-x-4">
            <button
              onClick={() => handleSortChange("ratingHigh")}
              className={`pb-2 ${
                sortOption === "ratingHigh" ? "border-b-2 border-black " : ""
              }`}
            >
              <span className="text-black font-medium">User Rating</span>{" "}
              <span className="text-gray-500">(Highest First)</span>
            </button>
            <button
              onClick={() => handleSortChange("ratingLow")}
              className={`pb-2 ${
                sortOption === "ratingLow" ? "border-b-2 border-black" : ""
              }`}
            >
              <span className="text-black font-medium">User Rating</span>{" "}
              <span className="text-gray-500">(Lowest First)</span>
            </button>
            <button
              onClick={() => handleSortChange("priceHigh")}
              className={`pb-2 ${
                sortOption === "priceHigh" ? "border-b-2 border-black" : ""
              }`}
            >
              <span className="font-medium">Price</span>{" "}
              <span className="text-gray-500">(Highest First)</span>
            </button>
            <button
              onClick={() => handleSortChange("priceLow")}
              className={`pb-2 ${
                sortOption === "priceLow" ? "border-b-2 border-black" : ""
              }`}
            >
              <span className="font-medium">Price</span>{" "}
              <span className="text-gray-500">(Lowest First)</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4 grid-flow-dense">
          {hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hotel;
