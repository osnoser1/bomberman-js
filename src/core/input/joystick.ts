// @ts-ignore
import nipplejs, { JoystickOutputData } from 'nipplejs';
import { Player } from '../player/player';
import { Input } from './gamepad';
import Buttons = Input.Buttons;
import Gamepad = Input.Gamepad;

function configJoyStick(player: Player) {
  const gamepad = player.gamepad;
  const manager = nipplejs.create({
    mode: 'static',
    position: { left: '100px', bottom: '100px' },
  });

  const endHandler = () => {
    gamepad.pressMany(false, [
      Buttons.Right,
      Buttons.Up,
      Buttons.Left,
      Buttons.Down,
    ]);
  };
  const moveHandler = (_: any, data: JoystickOutputData) => {
    const pressedButtons: Buttons[] = [];
    const unpressedButtons: Buttons[] = [];
    let buttons: Buttons[];
    if (!data.distance) {
      return;
    }

    buttons =
      data.angle.degree <= 60 || data.angle.degree >= 300
        ? pressedButtons
        : unpressedButtons;
    buttons.push(Buttons.Right);

    buttons =
      data.angle.degree >= 30 && data.angle.degree <= 150
        ? pressedButtons
        : unpressedButtons;
    buttons.push(Buttons.Up);

    buttons =
      data.angle.degree >= 120 && data.angle.degree <= 240
        ? pressedButtons
        : unpressedButtons;
    buttons.push(Buttons.Left);

    buttons =
      data.angle.degree >= 210 && data.angle.degree <= 330
        ? pressedButtons
        : unpressedButtons;
    buttons.push(Buttons.Down);

    gamepad.pressMany(true, pressedButtons);
    gamepad.pressMany(false, unpressedButtons);
  };

  manager.on('end', endHandler);
  manager.on('move', moveHandler);

  return () => {
    manager.off('end', endHandler);
    manager.off('move', moveHandler);
  };
}

function configButtons(player: Player) {
  const gamepad = player.gamepad;
  const body = document.querySelector('body')!;
  const [plantBombBtn, removePlantBombBtnEvent] = getButton(gamepad, {
    src: 'assets/joystick/bomb-btn.png',
    button: Buttons.A,
    width: '100px',
    bottom: '50px',
    right: '50px',
  });
  const [explodeBombBtn, removeExplodeBombBtnEvent] = getButton(gamepad, {
    src: 'assets/joystick/bomb-explode-btn.png',
    button: Buttons.B,
    width: '75px',
    bottom: '125px',
    right: '150px',
  });

  body.appendChild(plantBombBtn);
  body.appendChild(explodeBombBtn);

  return () => {
    removePlantBombBtnEvent();
    removeExplodeBombBtnEvent();
  };
}

function getButton(
  gamepad: Gamepad,
  {
    src,
    button,
    width,
    right,
    bottom,
  }: {
    src: string;
    button: Buttons;
    width: string;
    right: string;
    bottom: string;
  },
) {
  const btn = document.createElement('div');
  const img = document.createElement('img');

  img.src = src;
  btn.appendChild(img);

  Object.assign(btn.style, {
    bottom,
    display: 'flex',
    opacity: '0.5',
    position: 'absolute',
    right,
    transition: 'opacity 250ms ease 0s',
  } as CSSStyleDeclaration);
  Object.assign(img.style, {
    width,
    pointerEvents: 'none',
    userSelect: 'none',
  } as CSSStyleDeclaration);

  const bombActionCallbackEvent = (ev: Event) => {
    ev.stopPropagation();
    const isPointerDownEvt = ev.type === 'pointerdown';
    btn.style.opacity = isPointerDownEvt ? '0.8' : '0.5';
    gamepad.press(button, isPointerDownEvt);
  };

  btn.addEventListener('pointerdown', bombActionCallbackEvent);
  btn.addEventListener('pointerup', bombActionCallbackEvent);

  return [
    btn,
    () => {
      btn.removeEventListener('pointerdown', bombActionCallbackEvent);
      btn.removeEventListener('pointerup', bombActionCallbackEvent);
    },
  ] as const;
}

export function joystickConnection(player: Player) {
  const destroyJoyStick = configJoyStick(player);
  const destroyGamepad = configButtons(player);

  return () => {
    destroyJoyStick();
    destroyGamepad();
  };
}
