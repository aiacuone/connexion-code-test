import { Directions_enum } from '../lib/types'
import { Robot } from './Robot'
import { useRobotPageContext } from '../app/robot/robotPage'

export const Table = () => {
  const { position } = useRobotPageContext()

  const gridArray = Array.from({ length: 5 }, (_, y) =>
    Array.from({ length: 5 }, (_, x) => [x, 4 - y])
  ).flat()

  return (
    <div className="w-5/6 max-w-[450px]" style={{ aspectRatio: '1' }}>
      <div
        className="grid-cols-5 grid-rows-5 flex h-full grid w-full"
        style={{ direction: 'ltr', gridAutoFlow: 'rowReverse' }}>
        {gridArray.map(([x, y], index) => {
          const showRobot = position.x === x && position.y === y

          const background =
            index % 2 === 0 ? 'bg-neutral-500' : 'bg-neutral-600'

          const robotAngles: Record<Directions_enum, string> = {
            [Directions_enum.North]: '0',
            [Directions_enum.East]: '90',
            [Directions_enum.South]: '180',
            [Directions_enum.West]: '270',
          }
          const robotAngle = robotAngles[position.f]

          const rounded =
            index === 0
              ? 'rounded-tl-xl'
              : index === 4
              ? 'rounded-tr-xl'
              : index === 20
              ? 'rounded-bl-xl'
              : index === 24
              ? 'rounded-br-xl'
              : ''
          return (
            <div
              id={`${x}${y}`}
              key={`${index} table position`}
              className={`flex-1 ${background} ${rounded} center relative`}>
              <p className="opacity-50 text-sm sm:text-lg absolute bottom-2">
                {x} - {y}
              </p>
              {showRobot && <Robot robotAngle={robotAngle} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
