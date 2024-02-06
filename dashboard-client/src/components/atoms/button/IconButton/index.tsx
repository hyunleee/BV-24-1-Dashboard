import Button from '../Button';
import s from './index.module.scss';
import Image, { StaticImageData } from 'next/image';
import { ComponentProps, useState } from 'react';

export interface IconButtonProps extends ComponentProps<typeof Button> {
  icon: StaticImageData;
  hoverIcon?: StaticImageData;
}

export default function IconButton(props: IconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={props.onClick}
    >
      <div className={s.button_image_container}>
        <Image
          src={props.icon}
          alt="DefaultIcon"
          className={`${s.button_image} ${props.hoverIcon && isHovered ? s.fadeOut : ''}`}
          width={15}
          height={15}
        ></Image>
        {props.hoverIcon && (
          <Image
            src={props.hoverIcon}
            alt="HoverIcon"
            className={`${s.button_image} ${isHovered ? '' : s.fadeOut}`}
            width={15}
            height={15}
          ></Image>
        )}
      </div>
    </Button>
  );
}
