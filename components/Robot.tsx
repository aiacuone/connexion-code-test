import { GiVintageRobot } from 'react-icons/gi'
import { useCodeTestPageContext } from '../app/code-test/page'

export const Robot = ({ robotAngle }: { robotAngle: string }) => {
  return (
    <div className="absolute w-1/2 h-1/2">
      <div className="relative center">
        <div style={{ transform: `rotate(${robotAngle}deg)` }}>
          <GiVintageRobot size="full" />
        </div>
        <ReportPopover />
        <FallOverPopover />
      </div>
    </div>
  )
}

const ReportPopover = () => {
  const { position, reportPopoverDisclosure } = useCodeTestPageContext()
  const { isOpen: isReportPopoverOpen } = reportPopoverDisclosure
  const { x, y, f } = position

  return (
    <>
      {isReportPopoverOpen && (
        <p className="absolute -top-10 w-auto z-10 bg-white rounded whitespace-nowrap px-3 py-1">
          I am at {x}, {y}, Facing {f.toUpperCase()}
        </p>
      )}
    </>
  )
}

const FallOverPopover = () => {
  const { fallOverPopoverDisclosure } = useCodeTestPageContext()
  const { isOpen: isFallOverPopoverOpen } = fallOverPopoverDisclosure

  return (
    <>
      {isFallOverPopoverOpen && (
        <p className="absolute -top-10 w-auto z-10 bg-white rounded whitespace-nowrap px-3 py-1">
          I cant move there, I will fall over!
        </p>
      )}
    </>
  )
}
