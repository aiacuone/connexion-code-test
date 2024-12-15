'use client'

import { useDisclosure } from '../../lib'
import { createContext, useContext, Context } from 'react'
import { Table } from '@/components/Table'
import { Commands } from '@/components/Commands'
import { Position_int, Command_int, Directions_enum } from '../../lib/types'
import { useState, useCallback } from 'react'

interface RobotPageContext_int {
  position: Position_int
  setPosition: (position: Position_int) => void
  updatePosition: (position: Partial<Position_int>) => void
  reportPopoverDisclosure: ReturnType<typeof useDisclosure>
  fallOverPopoverDisclosure: ReturnType<typeof useDisclosure>
  commands: Command_int[]
  setCommands: (commands: Command_int[]) => void
  commandIndex: number
  setCommandIndex: (index: number) => void
  isRobotMoving: boolean
  onStopRobotMoving: () => void
}

let RobotPageContext: Context<RobotPageContext_int>

export const RobotPage = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    f: Directions_enum.South,
  })
  const [commands, setCommands] = useState<Command_int[]>([])
  const [commandIndex, setCommandIndex] = useState(0)
  const isRobotMoving = !!commands.length

  const reportPopoverDisclosure = useDisclosure()
  const fallOverPopoverDisclosure = useDisclosure()

  const updatePosition = useCallback(({ x, y, f }: Partial<Position_int>) => {
    setPosition((prev) => ({
      x: x ?? prev.x,
      y: y ?? prev.y,
      f: f ?? prev.f,
    }))
  }, [])

  const onStopRobotMoving = useCallback(() => {
    setCommands([])
    setCommandIndex(0)
  }, [])

  const props: RobotPageContext_int = {
    position,
    setPosition,
    updatePosition,
    reportPopoverDisclosure,
    fallOverPopoverDisclosure,
    commands,
    setCommands,
    commandIndex,
    setCommandIndex,
    isRobotMoving,
    onStopRobotMoving,
  }

  RobotPageContext = createContext(props)

  return (
    <RobotPageContext.Provider value={props}>
      <div className="h-full">
        <div className="stack w-full h-full center gap-3">
          <Table />
          <Commands />
        </div>
      </div>
    </RobotPageContext.Provider>
  )
}

export const useRobotPageContext: () => RobotPageContext_int = () =>
  useContext(RobotPageContext)
