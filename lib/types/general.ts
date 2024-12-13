export enum Directions_enum {
  n = 'North',
  e = 'East',
  s = 'South',
  w = 'West',
}

export interface Position_int {
  x: number
  y: number
  f: Directions_enum
}

export enum Command_enum {
  report = 'Report',
  move = 'Move',
  left = 'Left',
  right = 'Right',
  place = 'Place',
}

export interface Command_int {
  place: Position_int
  list: Command_enum[]
}
