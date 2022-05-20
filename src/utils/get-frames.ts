export const getFrames =
  (row: number, numberOfSpriteColumns: number) => (frame: number) =>
    row * numberOfSpriteColumns + frame;
