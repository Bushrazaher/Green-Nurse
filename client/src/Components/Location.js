import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";


export default function Location() {
    const [ip, setIp] = useState(null); //State to hold the IP address
    const [country, setCountry] = useState(null); //State to hold geolocation
    const [region, setRegion] = useState(null); // State to hold geolocation

   const getGeoLocationData = async () => {
        try { 
          const response = await axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_CUUyxu3T6NfwVWLe1MtyBM0SIipjU&ipAddress=8.8.8.8`);
          setIp(response.data.ip);
          setCountry(response.data.location.country); // Set country
          setRegion(response.data.location.region); // Set region
         
        } catch (error) {
          console.error("Error fetching geolocation data:", error.message);
        }
      };
      useEffect(() => {
        getGeoLocationData();
    }, []);
  
   return (
      <div>
        <h6>{ip}</h6>
        <h6>{country}</h6>
        <h6>{region}</h6>
      </div>
    );
  
}
