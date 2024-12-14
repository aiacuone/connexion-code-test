import { GiVintageRobot } from 'react-icons/gi'
import { Directions_enum } from '../lib/types'
import { useRobotPageContext } from '../app/robot/robotPage'
import { FC } from 'react'
interface RobotProps {
  robotAngle: string
}

export const Robot: FC<RobotProps> = ({ robotAngle }) => {
  return (
    <div className="absolute w-1/2 h-1/2">
      <div className="relative center">
        <div style={{ transform: `rotate(${robotAngle}deg)` }}>
          <GiVintageRobot size="full" />
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
          className={`absolute -top-10 w-auto z-10 ${
            isReportPopoverOpen ? 'bg-blue-500' : 'bg-red-500'
          } rounded whitespace-nowrap px-3 py-1`}>
          {popoverText}
        </p>
      )}
    </>
  )
}
