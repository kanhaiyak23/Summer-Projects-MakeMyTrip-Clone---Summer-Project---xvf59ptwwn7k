
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from'react-router-dom';
// import { useState } from 'react';
const HotelCard = ({ hotel }) => {

  
  
  const ratingWord = (rating) => {
    if (rating >= 0 && rating < 1) return 'Poor';
    if (rating >= 1 && rating < 2) return 'Fair';
    if (rating >= 2 && rating < 3) return 'Decent';
    if (rating >= 3 && rating < 4) return 'Good';
    if (rating >= 4 && rating <= 5) return 'Very Good';
    return '';
  };
  if (!hotel || !hotel.images || hotel.images.length === 0) {
    return <div>No hotel data available</div>;
  }
  return (
    
    <div className="border p-4 mb-4 flex flex-col md:flex-row md:space-x-4">
        
        
      <div className="flex-1 p-2">
        <div className="mb-2">
          <img src={hotel.images[0]} alt={hotel.name} className="w-full h-40 md:h-60 object-cover rounded-lg" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {hotel.images.slice(1, 5).map((img, index) => (
            <img key={index} src={img} alt={`${hotel.name}-${index}`} className="w-full h-20 object-cover rounded-lg" />
          ))}
        </div>
      </div>
      <div className="flex-1 mt-4 md:mt-0">
        <h3 className="text-xl font-bold text-blue-500">{hotel.name}</h3>
        <p className="text-gray-600">{hotel.city}</p>
        <p className="text-blue-500 bg-blue-100 p-1 rounded-md inline-block">{ratingWord(hotel.rating)} ({hotel.rating})</p>
        <p className="text-gray-700 mt-2">{hotel.amenities.join(', ')}</p>
        
        {/* <button className='text-blue-500' onClick={gymhotel}  >Gym</button> */}
        

        {/* <p className="text-gray-700 mt-2">Gym: {hotel.amenities===("gym") ? 'Yes' : 'No'}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Book Now</button>
        <p className="text-lg font-semibold mt-2">Price: ${roundedCost}</p>
        //for hotel in which gym is located */}
        

      </div>
    </div>
  );
};

export default HotelCard;
