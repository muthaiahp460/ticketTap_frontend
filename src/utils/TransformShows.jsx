    const TransformShows = (shows) => {
    const data = new Map();
    for (let show of shows) {
        const { month, date, theaterName } = show;
        if (!data.has(month)) 
            data.set(month, new Map());

        const monthMap = data.get(month)

        if (!monthMap.has(date)) 
            monthMap.set(date, new Map())
        
        const dateMap = monthMap.get(date)

        if (!dateMap.has(theaterName)) 
        dateMap.set(theaterName, []);

        dateMap.get(theaterName).push(show)
        }
        return data;
}

export default TransformShows
