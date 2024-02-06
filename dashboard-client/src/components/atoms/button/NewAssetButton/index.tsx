import Button from '../Button';
import s from './index.module.scss';
import { ComponentProps } from 'react';

export interface NewAssetButtonProps extends ComponentProps<typeof Button> {}

export default function NewAssetButton(props: NewAssetButtonProps) {
  return (
    <Button className={s.new_asset_button} onClick={props.onClick}>
      <div className={s.message}>여기를 클릭해 추가하세요.</div>
      <div className={s.line} />
    </Button>
  );
}
