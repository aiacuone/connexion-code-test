import { useState } from 'react'

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = (isTimedOut = false) => {
    setIsOpen(true)

    if (isTimedOut) setTimeout(() => setIsOpen(false), 3000)
  }
  const onClose = () => setIsOpen(false)

  return {
    isOpen,
    onOpen,
    onClose,
  }
}
