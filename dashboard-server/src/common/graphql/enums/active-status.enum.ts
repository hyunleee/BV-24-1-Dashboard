import { registerEnumType } from '@nestjs/graphql';

export enum ACTIVE_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

registerEnumType(ACTIVE_STATUS, {
  name: 'ACTIVE_STATUS',
  description: '상태',
});
