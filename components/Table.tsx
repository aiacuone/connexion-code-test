import { useCodeTestPageContext } from '../app/code-test/page'
import { directions_enum } from '../lib/types'
import { Robot } from './Robot'

export const Table = () => {
  const { position } = useCodeTestPageContext()

  const gridArray = Array.from({ length: 5 }, (_, y) =>
    Array.from({ length: 5 }, (_, x) => [x, 4 - y])
  ).flat()

  return (
    <div className="w-2/3 h-2/3 rounded-xl overflow-hidden">
      <div
        className="grid-cols-5 grid-rows-5 flex h-full grid w-full"
        style={{ direction: 'ltr', gridAutoFlow: 'rowReverse' }}>
        {gridArray.map(([x, y], index) => {
          const showRobot = position.x === x && position.y === y

          // Please note: Ternary operators need to be used with tailwind
          const background = index % 2 === 0 ? 'bg-purple-500' : 'bg-blue-500'
          const robotAngles: Record<directions_enum, string> = {
            [directions_enum.n]: '0',
            [directions_enum.e]: '90',
            [directions_enum.s]: '180',
            [directions_enum.w]: '270',
          }
          const robotAngle = robotAngles[position.f]

          return (
            <div
              id={`${x}${y}`}
              key={`${index} table position`}
              className={`flex-1 ${background} center relative`}>
              {x}x , {y}y{showRobot && <Robot robotAngle={robotAngle} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
