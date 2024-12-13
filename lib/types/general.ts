export enum directions_enum {
  n = 'n',
  e = 'e',
  s = 's',
  w = 'w',
}

export interface Position_int {
  x: number
  y: number
  f: directions_enum
}
