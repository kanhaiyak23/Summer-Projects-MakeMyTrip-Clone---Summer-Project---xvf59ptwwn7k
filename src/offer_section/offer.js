import React, { useState, useEffect } from 'react';

const OffersCarousel = ({ pageType }) => {
  const [offers, setOffers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const offersPerPage = 9; // 3x3 grid

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"HOTELS"}', {
          headers: { projectId: 'your-project-id' },
        });
        const data = await response.json();
        setOffers(data.data.offers);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, [pageType]);

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - offersPerPage);
    }
  };

  const handleNextClick = () => {
    if (currentIndex + offersPerPage < offers.length) {
      setCurrentIndex(currentIndex + offersPerPage);
    }
  };

  return (
    <div className="offers-carousel relative px-10">
      <div className='text-3xl text-pretty m-2 text-gray-600 flex' ><h1>Offers</h1>
      <hr class='border-t-2 border-gray-500'/>
      </div>
      <button
        onClick={handlePrevClick}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
        disabled={currentIndex === 0}
      >
        ←
      </button>
      <div className="carousel grid grid-cols-3 gap-4">
        {offers.slice(currentIndex, currentIndex + offersPerPage).map((offer) => (
          <div key={offer._id} className="offer-card p-2 border border-gray-300 rounded-md flex flex-row items-center mb-4">
          <img src={offer.heroUrl} alt={offer.pTl} className="w-1/2 h-32 object-cover mr-4 rounded-md" />
          <div className="offer-details flex-1">
            <h3 className="font-bold text-lg mb-2">{offer.pTl}</h3>
            <p className="text-sm text-gray-600 mb-4">{offer.pTx}</p>
            <a
              href={pageType === 'hotels' ? 'https://www.makemytrip.com/hotels/' : 'https://www.makemytrip.com/flights/'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
            >
              {offer.ctaText}
            </a>
          </div>
        </div>
        
        ))}
      </div>
      <button
        onClick={handleNextClick}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
        disabled={currentIndex + offersPerPage >= offers.length}
      >
        →
      </button>
    </div>
  );
};

export default OffersCarousel;
