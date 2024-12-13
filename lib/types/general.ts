export enum directions_enum {
  n = 'north',
  e = 'east',
  s = 'south',
  w = 'west',
}

export interface Position_int {
  x: number
  y: number
  f: 'n' | 'e' | 's' | 'w'
}
