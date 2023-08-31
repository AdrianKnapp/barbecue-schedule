type InputTextProps = {
  id: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputText = ({ id, label, ...props }: InputTextProps) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input id={id} type="text" className="input" {...props} />
    </div>
  );
};

export default InputText;
