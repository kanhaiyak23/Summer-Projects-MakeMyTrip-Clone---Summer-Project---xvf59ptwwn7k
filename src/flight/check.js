import React, { useState, useEffect } from "react";
import axios from "axios";

const FlightSearchCard = () => {
  const [airports, setAirports] = useState({ from: [], to: [] });
  const [fromCity, setFromCity] = useState("Patna");
  const [fromCitycode, setFromCitycode] = useState("");

  const [toCity, setToCity] = useState("New Delhi");
  const [toCitycode, setToCitycode] = useState("");
  const [flights, setFlights] = useState([]);
  const [departureDate, setDepartureDate] = useState("2024-07-16");
  const [travellersClass, setTravellersClass] = useState(
    "1 Traveller, Economy/Premium Economy"
  );
  const [specialFare, setSpecialFare] = useState("Regular");
  const [showDropdown, setShowDropdown] = useState(false);
  const [airlines, setAirlines] = useState([]);
  useEffect(() => {
    const fetchAirports = async (city, setAirportFn) => {
      try {
        const response = await axios.get(
          `https://academics.newtonschool.co/api/v1/bookingportals/airport`,
          {
            headers: { projectId: "xvf59ptwwn7k" },
          }
        );
        // console.log(response.data.data.airports);
        setAirportFn(response.data.data.airports);
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    };

    // console.log(fromCity);
    // console.log(toCity);
    fetchAirports(fromCity, (data) =>
      setAirports((prev) => ({ ...prev, from: data }))
    );
    fetchAirports(toCity, (data) =>
      setAirports((prev) => ({ ...prev, to: data }))
    );
  }, [fromCity, toCity]);

  // console.log(airports);
  const searchFlights = async () => {
    // single flight get throgh iata code
    try {
      const source = fromCitycode;
      const destination = toCitycode;
      const day = new Date(departureDate).toLocaleString("en-us", {
        weekday: "short",
      });
      // console.log(source, destination);
      if (!source || !destination) {
        console.error("Source or destination airport code is missing");
        return;
      }

      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?day=${day}&source=${source}&destination=${destination}`,
        {
          headers: { projectId: "xvf59ptwwn7k" },
        }
      );
      setFlights(response.data.data.flights);
      // console.log("Fetched flights:", response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };
  //get the name of flight using mapping
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await axios.get(
          "https://d3dyfaf3iutrxo.cloudfront.net/general/upload/772e31502eb84d9ba9bfa8b5e8406991.json"
        );
        setAirlines(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlight();
  }, []);

  const handleClick = (airport) => {
    setFromCitycode(airport.iata_code);
    setFromCity(airport.city);
  };
  const handleClickto = (airport) => {
    setToCitycode(airport.iata_code);

    setToCity(airport.city);
    setShowDropdown(false);
  };
  const getAirlineInfo = (airlineId) => {
    return airlines.find(airline => airline._id.$oid === airlineId);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <label className="block text-sm font-medium text-gray-700">
            From
          </label>

          <div className="relative w-96">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full text-left bg-white border border-gray-300 py-2 px-4 rounded-lg shadow-sm flex items-center justify-between"
            >
              <span>{fromCity}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  showDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {showDropdown && (
              <div className="max-h-36">
                <ul className="absolute bg-white border border-gray-300 mt-2 w-full  rounded-lg shadow-lg z-10 max-h-72 overflow-y-auto">
                  {airports.from.map((airport) => (
                    <li
                      key={airport.iata_code}
                      className="p-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                      onClick={() => handleClick(airport)}
                    >
                      <div>
                        <div className="text-sm font-medium">
                          {airport.city}, {airport.country}
                        </div>
                        <div className="text-xs text-gray-500">
                          {airport.name}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700">
                        {airport.iata_code}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">To</label>
          <div className="relative w-96">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full text-left bg-white border border-gray-300 py-2 px-4 rounded-lg shadow-sm flex items-center justify-between"
            >
              <span>{toCity}</span>
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  showDropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {showDropdown && (
              <div className="max-h-36">
                <ul className="absolute bg-white border border-gray-300 mt-2 w-full  rounded-lg shadow-lg z-10 max-h-72 overflow-y-auto">
                  {airports.to.map((airport) => (
                    <li
                      key={airport.iata_code}
                      className="p-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                      onClick={() => handleClickto(airport)}
                    >
                      <div>
                        <div className="text-sm font-medium">
                          {airport.city}, {airport.country}
                        </div>
                        <div className="text-xs text-gray-500">
                          {airport.name}
                        </div>
                      </div>
                      <div className="text-sm text-gray-700">
                        {airport.iata_code}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div> </div>
      </div>
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <label className="block text-sm font-medium text-gray-700">
            Departure Date
          </label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Travellers & Class
          </label>
          <input
            type="text"
            value={travellersClass}
            onChange={(e) => setTravellersClass(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="flex items-center mb-4">
        <label className="block text-sm font-medium text-gray-700 mr-4">
          Select a special fare
        </label>
        <div className="flex items-center space-x-4">
          {[
            "Regular",
            "Student",
            "Senior Citizen",
            "Armed Forces",
            "Doctor and Nurses",
          ].map((fare) => (
            <label key={fare} className="flex items-center">
              <input
                type="radio"
                value={fare}
                checked={specialFare === fare}
                onChange={(e) => setSpecialFare(e.target.value)}
                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2">{fare}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={searchFlights}
        className="mt-4 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        SEARCH
      </button>

      {/* //flight card */}
      {flights.length > 0 && (

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Available Flights</h2>
          <ul>
            {flights.map((flight) => (
              // const airlineInfo = getAirlineInfo(flight.airline);
              <li
                key={flight._id}
                className="mb-4 p-4 border border-gray-200 rounded-lg"
              >
                <p className="text-sm text-gray-700">
                  <br />
                  Flight Number: {flight.flightNumber}
                </p>
                <p className="text-sm text-gray-700">
                  <br />
                  Airline: {flight.airline}
                </p>
                <p className="text-sm text-gray-700">
                  Departure Time: {flight.departureTime}
                </p>
                <p className="text-sm text-gray-700">
                  Arrival Time: {flight.arrivalTime}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightSearchCard;
//
