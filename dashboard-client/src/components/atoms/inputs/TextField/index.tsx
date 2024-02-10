import s from './index.module.scss';
import { UIProps } from '@/components/atoms/props';
import { forwardRef, useEffect, useState } from 'react';

export interface TextFieldProps extends UIProps.Input {
  placeholder?: string;
  type?: 'email' | 'password' | 'number' | 'phone' | 'search';
  error?: boolean;
  value?: string | number;
  defaultValue?: string | number;
}

export const getDefaultValue = (
  type?: 'email' | 'password' | 'number' | 'phone' | 'search',
  value?: string | number,
  defaultValue?: string | number
) => {
  if (value !== undefined) return value;
  if (defaultValue !== undefined) return defaultValue;
  if (type === 'number') return 0;
  return '';
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(props, ref) {
  const [internalValue, setInternalValue] = useState(getDefaultValue(props.type, props.value, props.defaultValue));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(event.target.value);
    props.onChange?.(event);
  };

  useEffect(() => {
    if (props.value === undefined) return;
    setInternalValue(props.value);
  }, [props.value]);

  return (
    <div className={`${s.text_field} ${props.error ? s.error : ''}`}>
      <input
        placeholder={props.placeholder}
        type={props.type}
        ref={ref}
        value={internalValue}
        onChange={handleChange}
      ></input>
    </div>
  );
});

export default TextField;
