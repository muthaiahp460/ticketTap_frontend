import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import transformSeats from './utils/transformSeats'

const SeatLayout = () => {
  const params=useParams()
  const id=params.id
  const [seats,setSeats]=useState(new Map())
  const [selectedSeats,setSelectedseats]=useState([])
  const [selectedSeatIds,setselectedSeatIds]=useState([])
  const [price,setPrice]=useState(0)
  
  const handleSelect=(s)=>{
    if(s.status=="available")
    {
      if(selectedSeats.includes(s.id)){
        console.log(s.rowNo+s.seatNO)
        setSelectedseats(selectedSeats.filter((x)=>x!=s.id))
        setselectedSeatIds(selectedSeatIds.filter((x)=>x!=s.seatId))
      }
      else{
        if(selectedSeats.length>=10)
        {
          console.log("max limit reached")
        }
        else{
          setselectedSeatIds([...selectedSeatIds,s.seatId])
          setSelectedseats([...selectedSeats,s.id])
        }
      }
    }
  }

  useEffect(()=>{
    const calculatePrice=async()=>{
    const result=await axios.post(`http://localhost:3000/show/${id}/seats/price`,{
      seatIds:selectedSeatIds,
      showId:id
    })
    setPrice(result.data.price)
  }
  calculatePrice()},[selectedSeats])

  useEffect(()=>{
    const func=async()=>{
      const result=await axios.get(`http://localhost:3000/show/${id}/seats`)
      setSeats(transformSeats(result.data.data))
    }
    func()
  },[])

  const lockSeats=()=>{
    const booking=axios.post(`http://localhost:3000/booking`,{
      showId:id,
      seatIds:selectedSeatIds
    })
  }

  return (
    <div>
      <div>
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
      {
        selectedSeats.length>0 &&
        <button className='bg-red-500 py-2 px-3 rounded-md my-8 mx-160 text-white'
        onClick={()=>lockSeats()}>
          {`Proceed to pay ${price}`}
        </button>
      }
        </div>
    </div>
  )
}

export default SeatLayout
