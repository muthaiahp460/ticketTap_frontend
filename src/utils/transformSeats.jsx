import React from 'react'

const transformSeats = (seats) => {
    const data=new Map()
    for(let seat of seats){
        const {id,rowNo,seatNo,seatLabel,type,price,status}=seat
        if(!data.has(rowNo)){
            data.set(rowNo,[seat])
        }
        else
            data.get(rowNo).push(seat)
    }
    return data;
}

export default transformSeats
