import { getFrames } from './get-frames';

export function addAnimationToElement(
  tileSetName: string,
  animations: { frames: number[]; row: number; key: string; repeat?: number }[],
  anims: Phaser.Animations.AnimationState,
  numberOfSpriteColumns: number,
  frameRate: number,
) {
  animations.forEach(a => {
    anims.create({
      key: a.key,
      frames: anims.generateFrameNumbers(tileSetName, {
        frames: a.frames.map(getFrames(a.row, numberOfSpriteColumns)),
      }),
      frameRate,
      repeat: a.repeat ?? -1,
    });
  });
}
