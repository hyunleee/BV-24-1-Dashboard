import Button from '../Button';
import s from './index.module.scss';
import classNames from 'classnames/bind';
import { ComponentProps } from 'react';

const cx = classNames.bind(s);

export interface BaseButtonProps extends ComponentProps<typeof Button> {
  assert?: boolean;
}

export default function BaseButton({ assert = false, name, ...rest }: BaseButtonProps) {
  return (
    <Button className={cx('button_s', { assert })} {...rest}>
      {name}
    </Button>
  );
}
