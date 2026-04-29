import React from 'react'
import StatsCard from './StatsCard'

const Analytics = ({analytics}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
            <StatsCard title="Total Movies" value={analytics.movieCount} />
            <StatsCard title="Total Theaters" value={analytics.totalTheaters} />
            <StatsCard title="Bookings" value={analytics.bookingCount} />
            <StatsCard title="Revenue" value={analytics.totalRevenue} />
    </div>
  )
}

export default Analytics
