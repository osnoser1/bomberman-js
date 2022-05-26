// @ts-ignore
import nipplejs, { JoystickOutputData } from 'nipplejs';
import { Player } from '../player/player';
import { Input } from './gamepad';
import Buttons = Input.Buttons;

function configJoyStick(player: Player) {
  const gamepad = player.gamepad;
  const manager = nipplejs.create({
    mode: 'static',
    position: { left: '100px', bottom: '100px' },
  });

  manager.on('end', () => {
    gamepad.pressMany(false, [
      Buttons.Right,
      Buttons.Up,
      Buttons.Left,
      Buttons.Down,
    ]);
  });

  manager.on('move', (_: any, data: JoystickOutputData) => {
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
  });
}

function configButtons(player: Player) {
  const gamepad = player.gamepad;
  const body = document.querySelector('body')!;
  const btn = document.createElement('div');
  const img = document.createElement('img');

  img.src = 'assets/joystick/bomb-btn.png';
  btn.appendChild(img);

  Object.assign(btn.style, {
    bottom: '50px',
    display: 'flex',
    opacity: '0.5',
    position: 'absolute',
    right: '50px',
    transition: 'opacity 250ms ease 0s',
  } as CSSStyleDeclaration);
  Object.assign(img.style, {
    width: '100px',
    pointerEvents: 'none',
    userSelect: 'none',
  } as CSSStyleDeclaration);

  body.appendChild(btn);

  const bombActionCallbackEvent = (ev: Event) => {
    ev.stopPropagation();
    const isPointerDownEvt = ev.type === 'pointerdown';
    btn.style.opacity = isPointerDownEvt ? '0.8' : '0.5';
    gamepad.press(Buttons.A, isPointerDownEvt);
  };

  btn.addEventListener('pointerdown', bombActionCallbackEvent);
  btn.addEventListener('pointerup', bombActionCallbackEvent);
}

export function joystickConnection(player: Player) {
  configJoyStick(player);
  configButtons(player);
}
