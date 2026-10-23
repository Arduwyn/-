import * as migration_20260530_154939 from './20260530_154939';
import * as migration_20261023_182038 from './20261023_182038';
import * as migration_20261023_182650 from './20261023_182650';

export const migrations = [
  {
    up: migration_20260530_154939.up,
    down: migration_20260530_154939.down,
    name: '20260530_154939',
  },
  {
    up: migration_20261023_182038.up,
    down: migration_20261023_182038.down,
    name: '20261023_182038',
  },
  {
    up: migration_20261023_182650.up,
    down: migration_20261023_182650.down,
    name: '20261023_182650',
  },
];
