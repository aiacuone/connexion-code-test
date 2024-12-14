'use client'

import { useDisclosure } from '../../lib'
import { createContext, useContext, Context, FC } from 'react'
import { Table } from '@/components/Table'
import { Commands } from '@/components/Commands'
import { Position_int } from '../../lib/types'
import { Command_int } from '../../lib/types'

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
}

let RobotPageContext: Context<RobotPageContext_int>

export const RobotPageTemplate: FC<RobotPageContext_int> = (props) => {
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
