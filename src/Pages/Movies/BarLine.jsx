import React from 'react'

const BarLine = () => {
  return (
    <div className="mt-4">
        <div className="
        bg-gray-200
        rounded-lg
        py-3 px-4
        flex flex-wrap
        items-center
        gap-4 sm:gap-6 lg:gap-10
        text-sm sm:text-base
        ">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <p className="text-gray-600">Available</p>
            </div>

            <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-orange-400"></div>
            <p className="text-gray-600">Filling fast</p>
            </div>

            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <p className="text-gray-600">Filled</p>
            </div>
        </div>
    </div>
  )
}

export default BarLine
