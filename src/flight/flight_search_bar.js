import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FlightSearchBar = () => {
  const [airports, setAirports] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [journeyDate, setJourneyDate] = useState(new Date());
  const [classType, setClassType] = useState("Economy");
  const [travellers, setTravellers] = useState(1);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const[selectedAirport,setAirport]=useState("select airports");
  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch(
          "https://academics.newtonschool.co/api/v1/bookingportals/airport",
          {
            headers: {
              projectId: "xvf59ptwwn7k",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch airports");
        }
        const data = await response.json();
        setAirports(data.data.airports);
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    };

    fetchAirports();
  }, []);
  const onFlightselected = (airport) => {
    setDropdownVisible(false);
    console.log(airport);
    setAirport(airport.name);

  }

  const handleSearch = async () => {
    const day = journeyDate.toDateString().split(" ")[0].substring(0, 3);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight?day=${day}&search={"source":"${source}","destination":"${destination}"}`,
        {
          headers: {
            projectId: "xvf59ptwwn7k",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to search flights");
      }
      const data = await response.json();
      console.log("Flight search results:", data);
    } catch (error) {
      console.error("Error searching flights:", error);
    }
  };

  const handleSwap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  return (
    <>
    <div className="relative bg-cover"><img src="https://imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/bg6.jpg"></img>
    <div className="absolute inset-0 flex justify-center items-center text-black  " >
      <div className="  navbar z-index  top-0 w-8/12  ">
        <nav className=" bg-white  flex items-center px-2 py-8 box-border justify-center rounded-xl  ">
          <ul className="w-full flex list-none box-border gap-11 ">
            <li className="flex  flex-col relative flex-shrink-0  ">
              <span className="flex justify-center align-center h-10 w-11 mb-1 box-border">
            <img
              src="https://cdn-icons-png.flaticon.com/256/7893/7893974.png"
              className="h-10"
              alt="Flights"
            /></span>
            <span className="text border-b-4 border-bottom border-b-black w-auto  ">Flights</span>
            </li>
            <li className="flex  flex-col relative flex-shrink-0  ">
              <span className="flex justify-center align-center h-10 w-11 mb-1 box-border">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-UuW9fOZL36o3zxS1MNplEIpIA29uz1QTQ&s"
              className="h-10"
              alt="Flights"
            /></span>
            <span className="text border-b-4 border-bottom  w-auto  ">Hotel</span>
            </li>
            <li className="flex  flex-col relative flex-shrink-0 ">
              <span className="flex justify-center align-center h-10 w-11 mb-1 box-border">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV-UuW9fOZL36o3zxS1MNplEIpIA29uz1QTQ&s"
              className="h-10"
              alt="Flights"
            /></span>
            <span className="text border-b-4 border-bottom  w-auto  ">train</span>
            </li>

          </ul>
        </nav>
      </div>

    </div>
</div>

    </>
//     
  )



}
 



//<div className=" relative flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md">
//       <div className="flex items-center mb-4">
//         <div className="flex flex-col mx-2">
//           <label htmlFor="source" className="font-semibold mb-2">
//             From
//           </label>
//           <select
//             id="source"
//             value={source}
//             onChange={(e) => setSource(e.target.value)}
//             className="p-2 border border-gray-300 rounded-md"
//           >
//             <option value="" disabled>
//               Select source airport
//             </option>
//             {airports.map((airport) => (
//               <option key={airport.iata_code} value={airport.iata_code}>
//                 {airport.name} ({airport.city}, {airport.country})
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           className="mx-4 p-2 bg-gray-200 border border-gray-300 rounded-full"
//           onClick={handleSwap}
//         >
//           ⇄
//         </button>
//         <div className="">
//           <div
//             className="w-full p-2 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 text-2xl font-bold hover:blue"
//             onClick={() => setDropdownVisible(!isDropdownVisible)}
//           >
//             {selectedAirport || "City, Property Name Or Location"}
//             {selectedAirport && <div className="text-sm text-gray-500">India</div>}
//           </div>

//           {isDropdownVisible && (
//             <div className="absolute w-48 mt-1 max-h-48 overflow-y-auto rounded bg-white shadow-lg">
//               <label htmlFor="destination" className="font-semibold mb-2">
//                 To
//               </label>
//               <ul className="list-none m-0 p-0">
//                 {airports.map((airport) => (
//                   <li
//                     key={airport.iata_code}
//                     onClick={() => onFlightselected(airport)}
//                     className={`p-2 cursor-pointer ${
//                       destination === airport.iata_code ? "bg-gray-200" : ""
//                     }`}
//                   >
//                     {airport.name} ({airport.city}, {airport.country})
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="flex items-center mb-4">
//         <div className="flex flex-col mx-2">
//           <label htmlFor="journeyDate" className="font-semibold mb-2">
//             Departure
//           </label>
//           {/* <DatePicker
//             selected={journeyDate}
//             onChange={(date) => setJourneyDate(date)}
//             dateFormat="dd MMM yyyy"
//             className="p-2 border border-gray-300 rounded-md"
//           /> */}
//         </div>

//         <div className="flex flex-col mx-2">
//           <label htmlFor="travellers" className="font-semibold mb-2">
//             Travellers & Class
//           </label>
//           <input
//             type="number"
//             id="travellers"
//             min="1"
//             value={travellers}
//             onChange={(e) => setTravellers(e.target.value)}
//             className="p-2 border border-gray-300 rounded-md mb-2"
//           />
//           <select
//             id="classType"
//             value={classType}
//             onChange={(e) => setClassType(e.target.value)}
//             className="p-2 border border-gray-300 rounded-md"
//           >
//             <option value="Economy">Economy</option>
//             <option value="Premium Economy">Premium Economy</option>
//             <option value="Business">Business</option>
//             <option value="First-Class">First-Class</option>
//           </select>
//         </div>
//       </div>

//       <button
//         className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
//         onClick={handleSearch}
//       >
//         SEARCH
//       </button>
//     </div>
//   )
export default FlightSearchBar;