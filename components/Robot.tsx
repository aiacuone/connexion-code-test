import { GiVintageRobot } from 'react-icons/gi'
import { useCodeTestPageContext } from '../app/code-test/page'
import { directions_enum } from '../lib/types'
import { capitalizeFirstLetter } from '../lib/utils'

export const Robot = ({ robotAngle }: { robotAngle: string }) => {
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
    useCodeTestPageContext()
  const { isOpen: isReportPopoverOpen } = reportPopoverDisclosure
  const { isOpen: isFallOverPopoverOpen } = fallOverPopoverDisclosure

  const { x, y, f } = position
  const direction = directions_enum[f]
  const directionNames: Record<directions_enum, string> = {
    [directions_enum.n]: 'north',
    [directions_enum.e]: 'east',
    [directions_enum.s]: 'south',
    [directions_enum.w]: 'west',
  }
  const directionName = directionNames[direction as directions_enum]

  const showPopover = isReportPopoverOpen || isFallOverPopoverOpen

  const popoverText = isReportPopoverOpen
    ? `I am at ${x}, ${y}, facing ${capitalizeFirstLetter(directionName)}`
    : isFallOverPopoverOpen
    ? 'I cant move there, I will fall over!'
    : ''

  return (
    <>
      {showPopover && (
        <p className="absolute -top-10 w-auto z-10 bg-white rounded whitespace-nowrap px-3 py-1">
          {popoverText}
        </p>
      )}
    </>
  )
}
