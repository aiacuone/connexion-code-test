'use client'

import { useDisclosure } from '../../lib'
import { createContext, useContext, Context, useState } from 'react'
import { Table } from '@/components/Table'
import { Commands } from '@/components/Commands'
import { Position_int } from '../../lib/types'
import { Directions_enum, Command_int } from '../../lib/types'

interface CodeTestPageContext_int {
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

let CodeTestPageContext: Context<CodeTestPageContext_int>

// Todo:
// Make sure you don't need Toast or Popover anymore. If not remove them
// Look at why imports arent working using index.ts

//trade offs: Having the state be in the context makes it easier to manage the state across the app. However, it can be harder to debug and understand the state of the app and also makes the app less efficient

const CodeTestPage = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    f: Directions_enum.North,
  })
  const [commands, setCommands] = useState<Command_int[]>([])
  const [commandIndex, setCommandIndex] = useState(0)

  const reportPopoverDisclosure = useDisclosure()
  const fallOverPopoverDisclosure = useDisclosure()

  const updatePosition = ({ x, y, f }: Partial<Position_int>) => {
    setPosition((prev) => ({
      x: x ?? prev.x,
      y: y ?? prev.y,
      f: f ?? prev.f,
    }))
  }

  const contextDefaultValues: CodeTestPageContext_int = {
    position,
    setPosition,
    updatePosition,
    reportPopoverDisclosure,
    fallOverPopoverDisclosure,
    commands,
    setCommands,
    commandIndex,
    setCommandIndex,
  }

  CodeTestPageContext = createContext(contextDefaultValues)

  return (
    <CodeTestPageContext.Provider value={contextDefaultValues}>
      <div className="h-full">
        <div className="stack w-full h-full center gap-3">
          <Table />
          <Commands />
        </div>
      </div>
    </CodeTestPageContext.Provider>
  )
}

const useCodeTestPageContext: () => CodeTestPageContext_int = () =>
  useContext(CodeTestPageContext)

export { CodeTestPage as default, useCodeTestPageContext }
