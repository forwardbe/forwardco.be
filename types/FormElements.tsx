export interface InputProps {
  label?: string;
  id: string;
  required?: boolean;
  placeholder?: string;
  type?: 'text' | 'number' | 'date' | 'time' | 'email' | 'password';
  defaultValue?: string;
  small?: boolean;
  startIcon?: any;
  endIcon?: any;
  startText?: string;
  endText?: string;
  textPadding?: string;
}

export interface SelectProps {
  label?: string;
  id: string;
  required?: boolean;
  defaultValue?: string;
  small?: boolean;
  options?: SelectOptionProps[];
}

export interface SelectOptionProps {
  id: number;
  name: string;
}
