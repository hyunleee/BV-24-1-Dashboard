import { UIProps } from '../props';

interface ButtonProps extends UIProps.Button {}

export default function Button(props: ButtonProps) {
  const { type = 'button', ...rest } = props;

  return <button type={type} {...rest} />;
}
