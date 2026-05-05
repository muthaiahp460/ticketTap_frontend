import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../utils/apiConfig';

const useOrders = () => {
  const [orders,setOrders]=useState([])
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/booking/orders`,{withCredentials:true});

        if (Array.isArray(res.data?.data)) {
          setOrders(res.data.data)
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
