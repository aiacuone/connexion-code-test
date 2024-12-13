import { useState } from 'react'

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = (isTimedOut = false) => {
    setIsOpen(true)

    const isTimedOutABoolean = typeof isTimedOut === 'boolean'

    if (isTimedOut && isTimedOutABoolean)
      setTimeout(() => setIsOpen(false), 3000)
  }
  const onClose = () => setIsOpen(false)

  const toggle = () => setIsOpen((prev) => !prev)

  return {
    isOpen,
    onOpen,
    onClose,
    toggle,
  }
}
