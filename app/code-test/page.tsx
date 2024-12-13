'use client'

import { useState } from 'react'
import { useDisclosure } from '../../lib'
import { createContext, useContext } from 'react'
import { Table } from '@/components/Table'
import { Commands } from '@/components/Commands'
import { Position_int } from '../../lib/types'

let CodeTestPageContext

// Todo:
// Make sure you don't need Toast or Popover anymore. If not remove them
// Look at why type errors are not appearing
// Look at why imports arent working using index.ts

const CodeTestPage = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, f: 'n' })
  const reportPopoverDisclosure = useDisclosure()
  const fallOverPopoverDisclosure = useDisclosure()

  const updatePosition = ({ x, y, f }: Partial<Position_int>) => {
    setPosition((prev) => ({
      x: x ?? prev.x,
      y: y ?? prev.y,
      f: f ?? prev.f,
    }))
  }

  const contextDefaultValues = {
    position,
    setPosition,
    updatePosition,
    reportPopoverDisclosure,
    fallOverPopoverDisclosure,
  }

  CodeTestPageContext = createContext(contextDefaultValues)

  return (
    <CodeTestPageContext.Provider value={contextDefaultValues}>
      <div className="center h-full">
        <Table />
        <Commands />
      </div>
    </CodeTestPageContext.Provider>
  )
}

export const useCodeTestPageContext = () => useContext(CodeTestPageContext)

export default CodeTestPage
