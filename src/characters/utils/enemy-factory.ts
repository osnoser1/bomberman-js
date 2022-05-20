import { isNil } from 'lodash-es';

export enum EnemyType {
  BALLOOM,
  ONEAL,
  DOLL,
  MINVO,
  KONDORIA,
  OVAPI,
  PASS,
  PONTAN,
  Length,
}

const enemyClasses = {} as Record<EnemyType, { new (...args: any[]): {} }>;

export function enemy(config: { type: EnemyType }) {
  return <T extends { new (...args: any[]): {} }>(enemyClass: T) => {
    registerEnemy({ ...config, enemyClass: enemyClass as any });
  };
}

function registerEnemy<T extends { new (...args: any[]): {} }>(config: {
  type: EnemyType;
  enemyClass: T;
}) {
  if (isNil(config.type)) {
    throw new TypeError('config.type is required');
  }

  if (enemyClasses[config.type]) {
    throw new Error(
      `The enemy with the name "${config.enemyClass.name}" has already exists, please try another name!`,
    );
  }

  enemyClasses[config.type] = config.enemyClass;
}

export function resolveEnemy(type: EnemyType) {
  return enemyClasses[type];
}
