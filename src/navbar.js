import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import HotelSearchBa from "./hotelsearchbar";
import OffersCarousel from "./offer_section/offer";
// { isAuthenticated, onLogout }
const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <>
      <div className="relative">
        <img
          src="https://imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/bg4.jpg"
          alt="bg-"
        />
        <div className=" absolute inset-0 bg-white-200">
          <nav className=" p-4 text-white flex justify-between items-center">
            <div>
              <Link to="/" className="text-2xl font-bold">
                <img
                  src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/mmtLogoWhite.png"
                  alt="Make My Trip"
                  class="h-12"
                />
              </Link>
            </div>
            <div>
              {isAuthenticated ? (
                <button
                  onClick={onLogout}
                  className="bg-red-500 px-4 py-2 rounded"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/signin"
                  className="bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-4 rounded  "
                  
                >
                  {/* <span class="bg-white text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-2">
           <span class="font-bold text-sm ">my</span> </span> */}
                  Login or Create Account
                </Link>
              )}
            </div>
          </nav>
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 px-4">
        <HotelSearchBa />
        </div>
        

        </div>
        

      </div>
      
      <div className=""><OffersCarousel/></div>
      <footer className="bg-black   p-12 flex justify-between items-center   ">
        <div>
          <Link
            to="https://x.com/makemytrip/?prefetchTimestamp=1718172166904"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              size="2xl"
              style={{ color: "#ffffff" }}
            />
          </Link>
          <Link to="" target="blank" className="relative  left-11">
            <FontAwesomeIcon
              icon={faFacebookF}
              size="xl"
              style={{ color: "#ffffff" }}
            />
          </Link>
        </div>
        <div className=" text-white">
          2024 MAKEMYTRIP PVT.LTD.
          <br />
          Country INDIA UsA UAE{" "}
        </div>
      </footer>
    </>
  );
};

export default Navbar;
