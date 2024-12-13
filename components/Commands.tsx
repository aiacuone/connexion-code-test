import { Button } from '@/components/ui/button'
import { useCodeTestPageContext } from '../app/code-test/page'
import {
  Command_enum,
  Directions_enum,
  Position_int,
} from '../lib/types/general'
import { FaRotateLeft } from 'react-icons/fa6'
import { FaRotateRight } from 'react-icons/fa6'
import { useDisclosure } from '../lib'
import { InputOutputDialog } from './InputOutputDialog'

export const Commands = () => {
  const {
    position,
    updatePosition,
    reportPopoverDisclosure,
    fallOverPopoverDisclosure,
  } = useCodeTestPageContext()
  const inputOutputDialogDisclosure = useDisclosure()

  const { onOpen: onOpenReportPopover, onClose: onCloseReportPopover } =
    reportPopoverDisclosure
  const { onOpen: onOpenFallOverPopover, onClose: onCloseFallOverPopover } =
    fallOverPopoverDisclosure

  const getNewDirection = (turn: Command_enum.Left | Command_enum.Right) => {
    const { f: direction } = position
    const directions = [
      Directions_enum.North,
      Directions_enum.East,
      Directions_enum.South,
      Directions_enum.West,
    ]

    const currentIndex = directions.indexOf(direction)
    const newIndex =
      turn === Command_enum.Left ? currentIndex - 1 : currentIndex + 1

    return directions[newIndex < 0 ? 3 : newIndex % 4]
  }

  const onMoveOrRotate = () => {
    onCloseReportPopover()
    onCloseFallOverPopover()
  }

  const onLeft = () => {
    updatePosition({ f: getNewDirection(Command_enum.Left) })
    onMoveOrRotate()
  }

  const onRight = () => {
    updatePosition({ f: getNewDirection(Command_enum.Right) })
    onMoveOrRotate()
  }

  const onMove = () => {
    const { x, y, f } = position
    const move = {
      [Directions_enum.North]: { x, y: y + 1 },
      [Directions_enum.East]: { x: x + 1, y },
      [Directions_enum.South]: { x, y: y - 1 },
      [Directions_enum.West]: { x: x - 1, y },
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

  const buttons = [
    { onClick: onLeft, icon: <FaRotateLeft /> },
    { onClick: onRight, icon: <FaRotateRight /> },
    { onClick: onMove, label: 'Move' },
    { onClick: onReport, label: 'Report' },
    {
      onClick: () => inputOutputDialogDisclosure.onOpen(),
      label: 'Input/Output',
    },
  ]

  const readCommands = ({
    place,
    list,
  }: {
    place: Position_int
    list: Command_enum[]
  }) => {
    inputOutputDialogDisclosure.onClose()

    console.log({ place, list })
  }

  return (
    <>
      <div className="stack">
        <div className="stack center">
          <div className="hstack gap-3">
            {buttons.map(({ onClick, icon, label }, index) => (
              <Button onClick={onClick} key={`${index} command button`}>
                {icon ?? icon}
                {label ?? label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <InputOutputDialog
        inputOutputDialogDisclosure={inputOutputDialogDisclosure}
        readCommands={readCommands}
      />
    </>
  )
}
