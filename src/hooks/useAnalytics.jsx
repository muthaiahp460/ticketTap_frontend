import axios from 'axios';
import { useState,useEffect } from 'react'
import { API_BASE_URL } from '../utils/apiConfig';

export const useAnalytics = (filter, startDate, endDate) => {
  const [analytics,setAnalytics]=useState({})
  useEffect(() => {
    const fetchAnalytics = async () => {
      let start = startDate;
      let end = endDate;

      const today = new Date();

      if (filter === "1m") {
        const d = new Date();
        d.setMonth(today.getMonth() - 1);
        start = d.toISOString().split("T")[0];
        end = today.toISOString().split("T")[0];
      }

      if (filter === "3m") {
        const d = new Date();
        d.setMonth(today.getMonth() - 3);
        start = d.toISOString().split("T")[0];
        end = today.toISOString().split("T")[0];
      }

      if (filter === "1y") {
        const d = new Date();
        d.setFullYear(today.getFullYear() - 1);
        start = d.toISOString().split("T")[0];
        end = today.toISOString().split("T")[0];
      }

      const res = await axios.get(
        `${API_BASE_URL}/analysis/theater?startDate=${start}&endDate=${end}`,
        { withCredentials: true }
      );

      setAnalytics(res.data);
    };

    fetchAnalytics();
  }, [filter, startDate, endDate])
  return {analytics}
}

