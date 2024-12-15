import { GiVintageRobot } from 'react-icons/gi'
import { Directions_enum } from '../lib/types'
import { useRobotPageContext } from '../app/robot/robotPage'
import { FaCaretDown } from 'react-icons/fa'

export const Robot = () => {
  const { position } = useRobotPageContext()

  const robotAngles: Record<Directions_enum, string> = {
    [Directions_enum.North]: '180',
    [Directions_enum.East]: '90',
    [Directions_enum.South]: '0',
    [Directions_enum.West]: '270',
  }
  const robotAngle = robotAngles[position.f]
  return (
    <div className="absolute w-1/2 h-1/2 top-1 sm:top-3">
      <div className="relative center">
        <div
          style={{ transform: `rotate(${robotAngle}deg)` }}
          className="center">
          <GiVintageRobot size="full" />
          <div className="absolute -bottom-3">
            <FaCaretDown />
          </div>
        </div>
        <Popover />
      </div>
    </div>
  )
}

const Popover = () => {
  const { position, reportPopoverDisclosure, fallOverPopoverDisclosure } =
    useRobotPageContext()
  const { isOpen: isReportPopoverOpen } = reportPopoverDisclosure
  const { isOpen: isFallOverPopoverOpen } = fallOverPopoverDisclosure

  const { x, y, f } = position
  const direction = Directions_enum[f]

  const directionName = direction

  const showPopover = isReportPopoverOpen || isFallOverPopoverOpen

  const popoverText = isReportPopoverOpen
    ? `I am at ${x}, ${y}, facing ${directionName}`
    : isFallOverPopoverOpen
    ? 'I cant move there, I will fall over!'
    : ''

  return (
    <>
      {showPopover && (
        <p
          className={`absolute -top-12 w-auto ${
            isReportPopoverOpen ? 'bg-white' : 'bg-red-500'
          } rounded whitespace-nowrap px-3 py-1 ${x === 0 ? '-left-4' : ''} ${
            x === 4 ? '-right-4' : ''
          }`}>
          {popoverText}
        </p>
      )}
    </>
  )
}
