import axios from "axios"

export const calculatePrice = async (id,selectedSeatIds) => {
      if (selectedSeatIds.length === 0) {
        return 0;
      }
      try {
        const result = await axios.post(
          `http://localhost:3000/show/${id}/seats/price`,
          { seatIds: selectedSeatIds, showId: id }
        )
        return result.data.price
      } catch (error) {
        console.error("Price calculation failed", error)
      }
}