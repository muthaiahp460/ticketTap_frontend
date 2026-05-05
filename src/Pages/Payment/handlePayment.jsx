import axios from "axios"
import { toast } from "react-toastify"
import { API_BASE_URL } from "../../utils/apiConfig"

// Create order + open Razorpay
export const handlePayment = async (bookingId, amount, navigate) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/booking/create-order`,
      { bookingId, amount },
      { withCredentials: true }
    )

    const { orderId } = res.data

    if (!window.Razorpay) {
      toast.error("Payment SDK not loaded")
      return
    }

    const options = {
      key: "rzp_test_SgbVDUEzNTIhd1",
      amount: amount * 100,
      currency: "INR",
      name: "Ticket Booking",
      description: "Movie Ticket",
      order_id: orderId,

      handler: async function (response) {
        try {
          await axios.post(
            `${API_BASE_URL}/booking/verify-payment`,
            {
              ...response,
              bookingId,
            },
            { withCredentials: true }
          )

          toast.success("Payment Successful 🎉")
          setTimeout(()=>navigate(`/success/${bookingId}`),500)
        } catch (_e) {
          toast.error("Payment verification failed ❌")
        }
      },

      modal: {
        ondismiss: function () {
          toast.info("Payment cancelled")
        },
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()

  } catch (_e) {
    toast.error("Payment failed to start")
  }
}