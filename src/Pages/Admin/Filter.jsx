import React from 'react'

const Filter = ({filter,setFilter}) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow">
        <h2 className="font-semibold text-gray-700">Analytics</h2>
        <div className="flex items-center gap-3">
            {[
            { label: "1M", value: "1m" },
            { label: "3M", value: "3m" },
            { label: "1Y", value: "1y" },
            { label: "Custom", value: "custom" }
            ].map((item) => (
            <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition
            ${
                filter === item.value
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            >
                {item.label}
            </button>
            ))}

            {filter === "custom" && (
            <div className="flex items-center gap-2 ml-2">
                <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border px-2 py-1 rounded-md text-sm"
                />
                <span className="text-gray-400">→</span>
                <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border px-2 py-1 rounded-md text-sm"
                />
            </div>
            )}
        </div>
    </div>
  )
}

export default Filter
