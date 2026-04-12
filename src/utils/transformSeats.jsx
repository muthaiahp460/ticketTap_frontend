const transformSeats = (data) => {
    const map = new Map()

    data.forEach(([rowNo, seats]) => {
        map.set(rowNo, seats)
    })

    return map
}

export default transformSeats