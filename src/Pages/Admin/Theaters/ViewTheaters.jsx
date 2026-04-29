import ListTheaters from "../../../components/Theater/ListTheaters";
import Search from "../../../components/Layout/Search";
import React from 'react'

const ViewTheaters = ({setScreen,selectedTheaterId,setSelectedTheaterId}) => {
  return (
    <div>
        <div className="flex justify-between">
            <h1 className="text-xl font-bold">Theater Management</h1>

            <div className="flex gap-6">
              <Search />
            </div>

            <button
              className="bg-yellow-400 p-2 rounded-md hover:cursor-pointer hover:shadow-xs"
              onClick={() => setOpen(true)}
            >
              Add Theater
            </button>
          </div>

          <div>
            <ListTheaters
              setScreen={setScreen}
              theaterId={selectedTheaterId}
              setSelectedTheaterId={setSelectedTheaterId}
            />
          </div>
    </div>
  )
}

export default ViewTheaters
