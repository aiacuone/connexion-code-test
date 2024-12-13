import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDisclosure } from '../lib'
import {
  Command_enum,
  Command_int,
  Directions_enum,
  Position_int,
} from '../lib/types'
import { FaRotateLeft, FaRotateRight } from 'react-icons/fa6'

export const InputOutputDialog = ({
  inputOutputDialogDisclosure,
  readCommands,
}: {
  inputOutputDialogDisclosure: ReturnType<typeof useDisclosure>
  readCommands: (commands: Command_int) => void
}) => {
  const [commands, setCommands] = useState<Command_int>({
    place: { x: 0, y: 0, f: Directions_enum.North },
    list: [],
  })
  const {
    isOpen: isInputOutputDialogOpen,
    toggle: toggleInputOutputDialog,
    onClose: onCloseInputOutputDialog,
  } = inputOutputDialogDisclosure

  const onOpenChange = () => toggleInputOutputDialog()

  const selectOptions = Object.values(Directions_enum).map((value) => ({
    value,
    label: value,
  }))

  const onDelete = () => {
    setCommands((prev) => ({
      ...prev,
      list: prev.list.slice(0, -1),
    }))
  }

  const onReset = () => {
    setCommands((prev) => ({
      ...prev,
      list: [],
    }))
  }

  const onAddCommand = (command: Command_enum) => {
    setCommands((prev) => ({
      ...prev,
      list: [...prev.list, command],
    }))
  }

  const buttons = [
    { onClick: () => onAddCommand(Command_enum.Left), icon: <FaRotateLeft /> },
    {
      onClick: () => onAddCommand(Command_enum.Right),
      icon: <FaRotateRight />,
    },
    {
      onClick: () => onAddCommand(Command_enum.Move),
      label: Command_enum.Move,
    },
    {
      onClick: () => onAddCommand(Command_enum.Report),
      label: Command_enum.Report,
    },
    { onClick: onReset, label: 'Reset' },
    { onClick: onDelete, label: 'Delete' },
  ]

  const onChangePlace = (
    value: number | Directions_enum,
    key: keyof Position_int
  ) => {
    setCommands((prev) => ({
      ...prev,
      place: { ...prev.place, [key]: value },
    }))
  }

  const onReadCommands = () => {
    readCommands(commands)
    onCloseInputOutputDialog()
  }

  return (
    <Dialog open={isInputOutputDialogOpen} onOpenChange={onOpenChange}>
      <DialogTitle></DialogTitle>
      <DialogContent className="h-5/6">
        <div className="stack gap-3">
          <p className="text-lg font-bold">Input/Output</p>
          <div className="hstack center bg-gray-100 p-4 rounded gap-2">
            <p>Place</p>
            <Input
              type="number"
              placeholder="X"
              className="w-[70px]"
              defaultValue={0}
              min={0}
              max={4}
              onChange={(e) => onChangePlace(Number(e.target.value), 'x')}
            />
            <Input
              type="number"
              placeholder="Y"
              defaultValue={0}
              min={0}
              max={4}
              className="w-[70px]"
              onChange={(e) => onChangePlace(Number(e.target.value), 'y')}
            />
            <Select
              value={commands.place.f}
              onValueChange={(value: Directions_enum) =>
                onChangePlace(value, 'f')
              }
              defaultValue={Directions_enum.North}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Direction</SelectLabel>
                  {selectOptions.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {buttons.map(({ onClick, label, icon }, index) => {
              return (
                <Button onClick={onClick} key={`${index} command button`}>
                  {label ?? label}
                  {icon ?? icon}
                </Button>
              )
            })}
          </div>
          <div className="stack gap-2 flex-1">
            <div className="hstack gap-2">
              <p className="font-bold">Place:</p>
              {Object.values(commands.place).map((value, index) => {
                return <p key={index}>{value}</p>
              })}
            </div>
            {commands.list.map((command, index) => (
              <p key={index}>{command}</p>
            ))}
          </div>
          <Button onClick={onReadCommands} className="self-center">
            Read Commands
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
