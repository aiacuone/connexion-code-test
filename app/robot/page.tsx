'use client'

import { useDisclosure } from '../../lib'
import { useState } from 'react'
import { Position_int } from '../../lib/types'
import { Directions_enum, Command_int } from '../../lib/types'
import { RobotPageTemplate } from './robotPage'

// Todo:
// Make sure you don't need Toast or Popover anymore. If not remove them
// Look at why imports arent working using index.ts

//trade offs: Having the state be in the context makes it easier to manage the state across the app. However, it can be harder to debug and understand the state of the app and also makes the app less efficient

const RobotPage = () => {
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

  const props = {
    position,
    setPosition,
    commands,
    setCommands,
    commandIndex,
    setCommandIndex,
    reportPopoverDisclosure,
    fallOverPopoverDisclosure,
    updatePosition,
  }

  return <RobotPageTemplate {...props} />
}

export default RobotPage
