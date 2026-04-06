
const SeatListing = ({seats,selectedSeats}) => {
console.log(seats)
  return (
    <div className='flex flex-col gap-6 items-center m-4'>
        {
          Array.from(seats).map(([rowNo,seat])=>(
            <div key={rowNo} className='grid grid-cols-11 gap-6'>
                <p>{rowNo}</p>
                  {
                    seat.map((s)=>{
      
                      return <p key={s.id}
                              className={(selectedSeats.includes(s.id))?'py-2 w-8 text-sm text-center rounded-md bg-green-500 hover:cursor-pointer':
                                (s.status=="available")?"py-2 w-8 text-sm text-center rounded-md border-2 border-green-300 hover:cursor-pointer":"py-2 w-8 text-sm text-center rounded-md bg-gray-600 text-white"}
                              onClick={()=>{handleSelect(s)}}
                              >
                              {s.seatNO}
                              </p>
                    })
                  }
            </div>
          ))
        }
      </div>
  )
}

export default SeatListing
