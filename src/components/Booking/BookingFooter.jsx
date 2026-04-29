import { toast } from "react-toastify";

const BookingFooter = ({ selectedSeats, price, lockSeats }) => {
  if (selectedSeats.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t p-3 flex justify-center shadow-md">
      <button
        className="bg-red-500 px-6 py-3 rounded-lg text-white font-medium w-full max-w-md hover:bg-red-600 active:scale-95 transition-all hover:cursor-pointer"
        onClick={()=>{toast.success("Seat Locked successfully");setTimeout(lockSeats,1000)}}
      >
        {`Proceed to pay ₹${price}`}
      </button>
    </div>
  )
}

export default BookingFooter