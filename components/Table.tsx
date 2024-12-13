import { useCodeTestPageContext } from '../app/code-test/page'
import { Directions_enum } from '../lib/types'
import { Robot } from './Robot'

export const Table = () => {
  const { position } = useCodeTestPageContext()

  const gridArray = Array.from({ length: 5 }, (_, y) =>
    Array.from({ length: 5 }, (_, x) => [x, 4 - y])
  ).flat()

  return (
    <div className="w-2/3 h-2/3">
      <div
        className="grid-cols-5 grid-rows-5 flex h-full grid w-full"
        style={{ direction: 'ltr', gridAutoFlow: 'rowReverse' }}>
        {gridArray.map(([x, y], index) => {
          const showRobot = position.x === x && position.y === y

          const background = index % 2 === 0 ? 'bg-purple-900' : 'bg-purple-600'
          const robotAngles: Record<Directions_enum, string> = {
            [Directions_enum.North]: '0',
            [Directions_enum.East]: '90',
            [Directions_enum.South]: '180',
            [Directions_enum.West]: '270',
          }
          const robotAngle = robotAngles[position.f]

          return (
            <div
              id={`${x}${y}`}
              key={`${index} table position`}
              className={`flex-1 ${background} center relative`}>
              <p className="opacity-20 font-bold">
                {x} / {y}
              </p>
              {showRobot && <Robot robotAngle={robotAngle} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
