import axios from "axios"
import { API_BASE_URL } from "./apiConfig"

export const calculatePrice = async (id,selectedSeatIds) => {
      if (selectedSeatIds.length === 0) {
        return 0;
      }
      try {
        const result = await axios.post(
          `${API_BASE_URL}/show/${id}/seats/price`,
          { seatIds: selectedSeatIds, showId: id }
        )
        return result.data?.price || 0
      } catch (error) {
        console.error("Price calculation error:", error)
        return 0
      }
}