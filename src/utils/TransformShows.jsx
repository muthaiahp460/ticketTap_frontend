const transformShows = (data) => {
  const monthMap = new Map();

  data.forEach((show) => {
    const { month, date, day } = show;

    if (!monthMap.has(month)) {
      monthMap.set(month, new Map());
    }

    const dateMap = monthMap.get(month);

    if (!dateMap.has(date)) {
      dateMap.set(date, {
        day,
        shows: []
      });
    }

    dateMap.get(date).shows.push(show);
    console.log(dateMap)
  });

  return monthMap;
};

export default transformShows;