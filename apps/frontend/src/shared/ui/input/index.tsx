import type { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {}

export const Input = ({className}: InputProps) => {
  return (
    <div>Input</div>
  )
}


// variants: rounded | default
// Нужно корректно обрабатывать error для input
// Мб сделать Compound или render prop для иконки слева и справа
// Мб добавить маски туда или что то типа того
// Добавить prop label