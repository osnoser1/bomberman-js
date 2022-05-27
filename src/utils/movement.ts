export type Direction = 'up' | 'down' | 'left' | 'right';

export type Orientation = 'horizontal' | 'vertical';

export type Axis = 'x' | 'y';

export const DirectionToOrientation: Record<Direction, Orientation> = {
  right: 'horizontal',
  left: 'horizontal',
  up: 'vertical',
  down: 'vertical',
};
