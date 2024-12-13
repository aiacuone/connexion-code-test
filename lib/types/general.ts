export enum Directions_enum {
  North = 'North',
  East = 'East',
  South = 'South',
  West = 'West',
}

export interface Position_int {
  x: number
  y: number
  f: Directions_enum
}

export enum Command_enum {
  Report = 'Report',
  Move = 'Move',
  Left = 'Left',
  Right = 'Right',
  Place = 'Place',
}

export interface Command_int {
  place: Position_int
  list: Command_enum[]
}
