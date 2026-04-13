import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";

const SeatLayouts = ({ rows = 14, cols = 22 }) => {
  const params = useParams();
  const screenId = params.screenId;

  // Keep A → Z internally
  const [layout, setLayout] = useState(() => {
    return Array.from({ length: rows }, (_, i) => ({
      rowLabel: String.fromCharCode(65 + i), // A → Z
      type: "seatRow",
      prevType: null,
      cells: Array.from({ length: cols }, (_, j) => ({
        col: j + 1,
        type: "seat",
        seatType: "normal",
        prev: null,
      })),
    }));
  });

  const [selectedMode, setSelectedMode] = useState("normal");

  const applyModeToRow = (rowIndex) => {
    const newLayout = [...layout];
    const row = newLayout[rowIndex];

    if (
      (selectedMode === "space" && row.type === "spaceRow") ||
      (selectedMode !== "space" &&
        row.cells.every((c) => c.seatType === selectedMode))
    ) {
      if (row.prevType) row.type = row.prevType;

      row.cells.forEach((cell) => {
        if (cell.prev) {
          cell.type = cell.prev.type;
          cell.seatType = cell.prev.seatType;
        }
      });

      setLayout(newLayout);
      return;
    }

    row.prevType = row.type;
    row.cells.forEach((cell) => {
      cell.prev = { type: cell.type, seatType: cell.seatType };
    });

    if (selectedMode === "space") {
      row.type = "spaceRow";
    } else {
      row.type = "seatRow";
      row.cells.forEach((cell) => {
        cell.type = "seat";
        cell.seatType = selectedMode;
      });
    }

    setLayout(newLayout);
  };

  const applyModeToCell = (rowIndex, colIndex) => {
    const newLayout = [...layout];
    const cell = newLayout[rowIndex].cells[colIndex];

    if (
      (selectedMode === "space" && cell.type === "space") ||
      (selectedMode !== "space" && cell.seatType === selectedMode)
    ) {
      if (cell.prev) {
        cell.type = cell.prev.type;
        cell.seatType = cell.prev.seatType;
      }
      setLayout(newLayout);
      return;
    }

    cell.prev = { type: cell.type, seatType: cell.seatType };

    if (selectedMode === "space") {
      cell.type = "space";
    } else {
      cell.type = "seat";
      cell.seatType = selectedMode;
    }

    setLayout(newLayout);
  };

  const getSeatNumber = (row, colIndex) => {
    return row.cells
      .slice(0, colIndex + 1)
      .filter((c) => c.type === "seat").length;
  };

  const processData = async () => {
    try {
      let rowCharCode = 65; // A → Z for backend

      const layoutData = layout.map((row) => {
        if (row.type === "spaceRow") return null;

        let seatCount = 1;
        const rowLabel = String.fromCharCode(rowCharCode++);

        return row.cells.map((cell) => {
          if (cell.type === "seat") {
            return {
              rowNO: rowLabel,
              seatNo: seatCount++,
              type: cell.seatType,
            };
          } else {
            return {
              rowNO: null,
              seatNo: null,
              type: null,
            };
          }
        });
      });

      await axios.post("http://localhost:3000/seat/add", {
        screenId,
        layout: layoutData,
      });

      alert("Seat layout saved");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-6 py-4 px-40">

      {/* TOOLBAR */}
      <div className="flex gap-3 justify-center">
        {["normal", "premium", "lounge", "space"].map((mode) => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            {mode}
          </button>
        ))}
      </div>

      {/* 🔥 REVERSED DISPLAY */}
      {[...layout].reverse().map((row, i) => {
        const realIndex = layout.length - 1 - i;

        return (
          <div key={i} className="flex items-center gap-2">

            <div
              onClick={() => applyModeToRow(realIndex)}
              className="w-8 font-bold text-center cursor-pointer"
            >
              {row.rowLabel}
            </div>

            {row.type === "spaceRow" ? (
              <div className="flex-1 h-6 bg-gray-200 rounded" />
            ) : (
              <div className="flex gap-2">
                {row.cells.map((cell, j) => (
                  <div
                    key={j}
                    onClick={() => applyModeToCell(realIndex, j)}
                    className="w-8 h-8 flex items-center justify-center bg-green-400"
                  >
                    {cell.type === "seat" ? getSeatNumber(row, j) : ""}
                  </div>
                ))}
              </div>
            )}

          </div>
        );
      })}

      <button
        onClick={processData}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Save Layout
      </button>

    </div>
  );
};

export default SeatLayouts;