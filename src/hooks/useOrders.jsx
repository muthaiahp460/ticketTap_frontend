import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useOrders = () => {
  const [orders,setOrders]=useState([])
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/booking/orders",{withCredentials:true});

        console.log("FULL RESPONSE:", res);
        console.log("DATA:", res.data);

        if (Array.isArray(res.data?.data)) {
          setOrders(res.data.data)
        } else {
          console.warn("API did not return array");
        }
      } catch (err) {
        console.error(err)
      }
    };

    fetchOrders();
  }, []);
  return orders
}

export default useOrders
