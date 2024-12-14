import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'
import { useState, useRef, FC } from 'react'
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
import { useToast } from '@/hooks/use-toast'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { RiResetLeftFill } from 'react-icons/ri'

interface InputOutputDialogProps {
  inputOutputDialogDisclosure: ReturnType<typeof useDisclosure>
  readCommands: (commands: Command_int[]) => void
}

export const InputOutputDialog: FC<InputOutputDialogProps> = ({
  inputOutputDialogDisclosure,
  readCommands,
}) => {
  const { toast } = useToast()
  const commandEndRef = useRef(null)

  const [commands, setCommands] = useState<Command_int[]>([])
  const {
    isOpen: isInputOutputDialogOpen,
    toggle: toggleInputOutputDialog,
    onClose: onCloseInputOutputDialog,
  } = inputOutputDialogDisclosure
  const defaultPlace: Position_int = {
    x: 0,
    y: 0,
    f: Directions_enum.North,
  }
  const [place, setPlace] = useState<Position_int>(defaultPlace)

  const onOpenChange = () => toggleInputOutputDialog()

  const selectOptions = Object.values(Directions_enum).map((value) => ({
    value,
    label: value,
  }))

  const onDelete = () => {
    setCommands((prev) => prev.slice(0, -1))
  }

  const onReset = () => {
    setCommands([])
    setPlace(defaultPlace)
  }

  const scrollToBottom = () => {
    const commandEndRefElement = commandEndRef.current as unknown as HTMLElement
    commandEndRefElement.scrollIntoView({
      behavior: 'smooth',
    })
  }

  const onAddCommand = (
    command: Command_enum,
    place: Position_int | undefined = undefined
  ) => {
    const isThisTheFirstCommand = commands.length === 0
    const isCommandAPlace = command === Command_enum.Place

    if (isThisTheFirstCommand && !isCommandAPlace) {
      return toast({
        title: 'Error',
        description: 'First command must be place',
        variant: 'destructive',
      })
    }

    setCommands((prev) => [...prev, place ? { command, place } : { command }])
    scrollToBottom()
  }

  const buttons = [
    {
      onClick: () => onAddCommand(Command_enum.Left),
      icon: <FaArrowLeft />,
    },
    {
      onClick: () => onAddCommand(Command_enum.Right),
      icon: <FaArrowRight />,
    },
    {
      onClick: () => onAddCommand(Command_enum.Report),
      label: Command_enum.Report,
    },
    {
      onClick: () => onAddCommand(Command_enum.Move),
      label: Command_enum.Move,
    },
    { onClick: onDelete, icon: <RiDeleteBack2Line /> },
    {
      onClick: onReset,
      icon: <RiResetLeftFill />,
    },
  ]

  const onChangePlace = (
    value: number | Directions_enum,
    key: keyof Position_int
  ) => {
    setPlace((prev) => ({ ...prev, [key]: value }))
  }

  const onReadCommands = () => {
    const areThereAnyCommands = commands.length > 0

    if (!areThereAnyCommands) {
      return toast({
        title: 'Error',
        description: 'Please add commands',
        variant: 'destructive',
      })
    }
    readCommands(commands)
    onCloseInputOutputDialog()
  }

  const onAddPlace = () => {
    onAddCommand(Command_enum.Place, place)
    setPlace(defaultPlace)
  }

  const bottomButtons = [
    { onClick: onReadCommands, label: 'Move Robot' },
    { onClick: onCloseInputOutputDialog, label: 'Close' },
  ]

  const inputs = ['x', 'y']

  return (
    <Dialog open={isInputOutputDialogOpen} onOpenChange={onOpenChange}>
      <DialogTitle></DialogTitle>
      <DialogContent className="h-5/6">
        <div className="stack gap-3 overflow-hidden">
          <p className="text-lg font-bold">Input/Output</p>
          <div className="hstack center bg-gray-100 p-4 rounded gap-2 flex-wrap">
            <div className="hstack gap-2">
              {inputs.map((key, index) => (
                <Input
                  key={index}
                  min={0}
                  max={4}
                  type="number"
                  placeholder={key.toUpperCase()}
                  className="w-[60px]"
                  value={place[key as keyof Position_int]}
                  onChange={(e) =>
                    onChangePlace(
                      Number(e.target.value),
                      key as keyof Position_int
                    )
                  }
                />
              ))}
            </div>
            <div className="hstack gap-2">
              <Select
                value={place.f}
                onValueChange={(value: Directions_enum) =>
                  onChangePlace(value, 'f')
                }
                defaultValue={Directions_enum.North}>
                <SelectTrigger className="w-[80px]">
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
              <Button onClick={onAddPlace}>Place</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {buttons.map(({ onClick, label, icon }, index) => {
              return (
                <Button onClick={onClick} key={`${index} command button`}>
                  {label ?? label}
                  {icon ?? icon}
                </Button>
              )
            })}
          </div>
          <div className="stack flex-1 overflow-y-scroll hide-scrollbar">
            {commands.map(({ command, place }, index) => (
              <p
                key={index}
                className={`${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                {command} {place && `: ${place.x}, ${place.y}, ${place.f}`}
              </p>
            ))}
            <div ref={commandEndRef} />
          </div>
          <div className="hstack center gap-2">
            {bottomButtons.map(({ onClick, label }, index) => {
              return (
                <Button onClick={onClick} key={`${index} bottom button`}>
                  {label}
                </Button>
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
