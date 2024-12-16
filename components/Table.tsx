import { useMemo } from 'react'
import { Robot } from './Robot'
import { useRobotPageContext } from '../app/robot/robotPage'

export const Table = () => {
  const { position } = useRobotPageContext()

  const gridArray = useMemo(
    () =>
      Array.from({ length: 5 }, (_, y) =>
        Array.from({ length: 5 }, (_, x) => [x, 4 - y])
      ).flat(),
    []
  )

  return (
    <div
      className="w-full max-w-[450px] box-shadow"
      style={{ aspectRatio: '1' }}>
      <div
        className="grid-cols-5 grid-rows-5 flex h-full grid w-full"
        style={{ direction: 'ltr', gridAutoFlow: 'rowReverse' }}>
        {gridArray.map(([x, y], index) => {
          const showRobot = position.x === x && position.y === y

          const background = index % 2 === 0 ? 'bg-cyan-700' : 'bg-cyan-800'

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
              {showRobot && <Robot />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
