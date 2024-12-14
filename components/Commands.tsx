import { Button } from '@/components/ui/button'
import { useDisclosure } from '../lib'
import { InputOutputDialog } from './InputOutputDialog'
import { useEffect, useCallback } from 'react'
import {
  Command_int,
  Directions_enum,
  Command_enum,
  Position_int,
} from '@/lib/types'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { RiResetLeftFill } from 'react-icons/ri'
import { useRobotPageContext } from '../app/robot/robotPage'

export const Commands = () => {
  const {
    position,
    updatePosition,
    reportPopoverDisclosure,
    fallOverPopoverDisclosure,
    commands,
    setCommands,
    commandIndex,
    setCommandIndex,
  } = useRobotPageContext()
  const inputOutputDialogDisclosure = useDisclosure()
  const isRobotMoving = !!commands.length

  const { onOpen: onOpenReportPopover, onClose: onCloseReportPopover } =
    reportPopoverDisclosure
  const { onOpen: onOpenFallOverPopover, onClose: onCloseFallOverPopover } =
    fallOverPopoverDisclosure

  const getNewDirection = useCallback(
    (turn: Command_enum.Left | Command_enum.Right) => {
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
    },
    [position]
  )

  const onMoveOrRotate = useCallback(() => {
    onCloseReportPopover()
    onCloseFallOverPopover()
  }, [onCloseFallOverPopover, onCloseReportPopover])

  const onLeft = useCallback(() => {
    updatePosition({ f: getNewDirection(Command_enum.Left) })
    onMoveOrRotate()
  }, [getNewDirection, onMoveOrRotate, updatePosition])

  const onRight = useCallback(() => {
    updatePosition({ f: getNewDirection(Command_enum.Right) })
    onMoveOrRotate()
  }, [getNewDirection, onMoveOrRotate, updatePosition])

  const onMove = useCallback(() => {
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
  }, [position, onOpenFallOverPopover, updatePosition, onMoveOrRotate])

  const onReport = useCallback(() => {
    onOpenReportPopover(true)
  }, [onOpenReportPopover])

  const buttons = [
    { onClick: onLeft, icon: <FaArrowLeft /> },
    { onClick: onRight, icon: <FaArrowRight /> },
    { onClick: onMove, label: Command_enum.Move },
    { onClick: onReport, label: Command_enum.Report },
    {
      onClick: () => updatePosition({ x: 0, y: 0, f: Directions_enum.North }),
      icon: <RiResetLeftFill />,
    },
    {
      onClick: () => inputOutputDialogDisclosure.onOpen(),
      label: 'Input/Output',
    },
  ]

  const readCommands = (_commands: Command_int[]) => {
    inputOutputDialogDisclosure.onClose()
    setCommandIndex(0)
    setCommands(_commands)
  }

  useEffect(() => {
    if (isRobotMoving) {
      const timer = setTimeout(() => {
        if (commandIndex < commands.length) {
          const { command, place } = commands[commandIndex]

          const commandFunctions = {
            [Command_enum.Left]: onLeft,
            [Command_enum.Right]: onRight,
            [Command_enum.Move]: onMove,
            [Command_enum.Report]: onReport,
            [Command_enum.Place]: () =>
              updatePosition(place as Partial<Position_int>),
          }

          commandFunctions[command]()
          setCommandIndex(commandIndex + 1)
        } else {
          setCommands([])
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [
    isRobotMoving,
    commands,
    commandIndex,
    setCommandIndex,
    setCommands,
    onLeft,
    onRight,
    onMove,
    onReport,
    updatePosition,
  ])

  return (
    <>
      <div className="stack">
        <div className="stack center">
          <div className="hstack gap-3 flex-wrap center">
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
