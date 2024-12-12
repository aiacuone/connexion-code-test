'use client'

import { useState } from 'react'

const CodeTestPage = () => {
  const [position, setPosition] = useState([0, 0])

  const onChangePosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedPosition = [...position]
    updatedPosition[Number(e.target.id)] = Number(e.target.value)

    setPosition(updatedPosition)
  }

  return (
    <div className="center h-full">
      <Table position={position} />
      <input
        id="0"
        type="number"
        min="0"
        max="4"
        placeholder="x"
        onChange={onChangePosition}
        value={position[0]}
      />
      <input
        id="1"
        type="number"
        min="0"
        max="4"
        placeholder="y"
        onChange={onChangePosition}
        value={position[1]}
      />
    </div>
  )
}

const Table = ({ position }: { position: [number, number] }) => {
  const gridNumberArray = Array.from({ length: 5 }, (_, i) => i).reduce(
    (acc, i) => acc.concat(Array.from({ length: 5 }, (_, j) => [i, j])),
    []
  )

  return (
    <div className="w-2/3 h-2/3 rounded-xl overflow-hidden">
      <div
        className="grid-cols-5 grid-rows-5 flex h-full grid w-full"
        style={{ direction: 'ltr', gridAutoFlow: 'rowReverse' }}>
        {gridNumberArray.map(([x, y], index) => {
          const showMarker = position[0] === x && position[1] === y
          const background = index % 2 === 0 ? 'bg-purple-500' : 'bg-blue-500'

          return (
            <div
              id={`${x}${y}`}
              onClick={(e) =>
                console.log({ x, y, id: e.target.id, e, index: e.target.index })
              }
              key={`${index} table position`}
              className={`flex-1 ${background} center relative`}>
              {x} , {y}
              {showMarker && (
                <div
                  className="w-1/2 h-1/2 bg-red-500 rounded-full absolute"
                  style={{ zIndex: 1 }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default CodeTestPage
