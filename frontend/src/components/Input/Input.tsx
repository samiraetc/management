import React from 'react';
import { Label } from '../ui/label';
import { Input as ShadcnInput } from '@/components/ui/input';
import { InputProps } from './types';
import { cn } from '@/lib/utils';

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = 'text',
  className = '',
  ...props
}) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <ShadcnInput
        type={type}
        id={id}
        className={cn(className, 'h-8 focus-visible:ring-offset-0')}
        {...props}
      />
    </div>
  );
};

export default Input;
