import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCodeTestPageContext } from '../app/code-test/page'
import { directions_enum } from '../lib/types/general'

export const Commands = () => {
  const {
    position,
    updatePosition,
    reportPopoverDisclosure,
    fallOverPopoverDisclosure,
  } = useCodeTestPageContext()

  const { onOpen: onOpenReportPopover, onClose: onCloseReportPopover } =
    reportPopoverDisclosure
  const { onOpen: onOpenFallOverPopover, onClose: onCloseFallOverPopover } =
    fallOverPopoverDisclosure

  const getNewDirection = (turn: 'left' | 'right') => {
    const { f: direction } = position
    const directions = [
      directions_enum.n,
      directions_enum.e,
      directions_enum.s,
      directions_enum.w,
    ]

    const currentIndex = directions.indexOf(direction)
    const newIndex = turn === 'left' ? currentIndex - 1 : currentIndex + 1

    return directions[newIndex < 0 ? 3 : newIndex % 4]
  }

  const onMoveOrRotate = () => {
    onCloseReportPopover()
    onCloseFallOverPopover()
  }

  const onLeft = () => {
    updatePosition({ f: getNewDirection('left') })
    onMoveOrRotate()
  }

  const onRight = () => {
    updatePosition({ f: getNewDirection('right') })
    onMoveOrRotate()
  }

  const onMove = () => {
    const { x, y, f } = position
    const move = {
      n: { x, y: y - 1 },
      e: { x: x - 1, y },
      s: { x, y: y + 1 },
      w: { x: x + 1, y },
    }

    const newPosition = move[f]

    const isNewPositionOutOfBounds = (() =>
      Object.values(newPosition).some((value) => value < 0 || value > 4))()

    if (isNewPositionOutOfBounds) return onOpenFallOverPopover(true)

    updatePosition(newPosition)
    onMoveOrRotate()
  }

  const onReport = ({}) => {
    onOpenReportPopover(true)
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
          <Button onClick={onReport}>Report</Button>
        </div>
      </div>
    </div>
  )
}
