import { LegacyRef, forwardRef } from 'react';

type InputTextProps = {
  id: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputText = forwardRef(({ id, label, ...props }: InputTextProps, ref: LegacyRef<HTMLInputElement>) => {
  return (
    <div className="input-wrapper">
      {label ? (
        <label htmlFor={id} className="label">
          {label}
        </label>
      ) : null}
      <input ref={ref} id={id} type="text" className="input" {...props} />
    </div>
  );
});

export default InputText;
