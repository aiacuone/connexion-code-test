'use client'

import { useState } from 'react'
import { GiVintageRobot } from 'react-icons/gi'
import { Input, Button } from '@/components/ui'
import { useToast } from '@/hooks/use-toast'

interface Position {
  x: number
  y: number
  f: 'n' | 'e' | 's' | 'w'
}

const CodeTestPage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, f: 'n' })

  const updatePosition = ({ x, y, f }: Partial<Position>) => {
    setPosition((prev) => ({
      x: x ?? prev.x,
      y: y ?? prev.y,
      f: f ?? prev.f,
    }))
  }

  return (
    <div className="center h-full">
      <Table position={position} />
      <Commands updatePosition={updatePosition} position={position} />
    </div>
  )
}

const Table = ({ position }: { position: Position }) => {
  const gridArray = Array.from({ length: 5 }, (_, y) =>
    Array.from({ length: 5 }, (_, x) => [x, 4 - y])
  ).flat()

  return (
    <div className="w-2/3 h-2/3 rounded-xl overflow-hidden">
      <div
        className="grid-cols-5 grid-rows-5 flex h-full grid w-full"
        style={{ direction: 'ltr', gridAutoFlow: 'rowReverse' }}>
        {gridArray.map(([x, y], index) => {
          const showMarker = position.x === x && position.y === y

          // Please note: Ternary operators need to be used with tailwind
          const background = index % 2 === 0 ? 'bg-purple-500' : 'bg-blue-500'
          const robotAngles = {
            n: '0',
            e: '90',
            s: '180',
            w: '270',
          }
          const robotAngle = robotAngles[position.f]

          return (
            <div
              id={`${x}${y}`}
              onClick={(e) =>
                console.log({ x, y, id: e.target.id, e, index: e.target.index })
              }
              key={`${index} table position`}
              className={`flex-1 ${background} center relative`}>
              {x}x , {y}y
              {showMarker && (
                <div
                  className={`absolute w-1/2 h-1/2`}
                  style={{ transform: `rotate(${robotAngle}deg)` }}>
                  <GiVintageRobot size="full" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Commands = ({
  position,
  updatePosition,
}: {
  position: Position
  updatePosition: ({ x, y, f }: Partial<Position>) => void
}) => {
  const { toast } = useToast()

  const getNewDirection = (turn: 'left' | 'right') => {
    const { f: direction } = position
    const directions = ['n', 'e', 's', 'w']
    const currentIndex = directions.indexOf(direction)
    const newIndex = turn === 'left' ? currentIndex - 1 : currentIndex + 1

    return directions[newIndex < 0 ? 3 : newIndex % 4]
  }

  const onLeft = () => {
    updatePosition({ f: getNewDirection('left') })
  }

  const onRight = () => {
    updatePosition({ f: getNewDirection('right') })
  }

  const onMove = () => {
    const { x, y, f } = position
    const move = {
      n: { x, y: y - 1 },
      e: { x: x - 1, y },
      s: { x, y: y + 1 },
      w: { x: x + 1, y },
    }

    const isXorYOutOfBounds = () => {
      return Object.values(move[f]).some((value) => value < 0 || value > 4)
    }

    if (isXorYOutOfBounds()) {
      console.log('Out of bounds')
      toast({ variant: 'destructive', title: 'Out of bounds' })
      return
    }

    updatePosition(move[f])
  }

  return (
    <div className="stack">
      <label>
        Place
        <Input type="text" placeholder="X,Y,F" />
      </label>
      <div className="stack">
        <div className="hstack">
          <Button onClick={onLeft}>Left</Button>
          <Button onClick={onRight}>Right</Button>
        </div>
        <div className="hstack">
          <Button onClick={onMove}>Move</Button>
          <Button>Report</Button>
        </div>
      </div>
    </div>
  )
}

export default CodeTestPage
