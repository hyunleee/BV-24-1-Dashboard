import { registerEnumType } from '@nestjs/graphql';

export enum DIRECTION {
  SEND = 'SEND',
  RECEIVE = 'RECEIVE',
}

registerEnumType(DIRECTION, {
  name: 'DIRECTION',
  description: '입금 또는 출금 여부',
});
