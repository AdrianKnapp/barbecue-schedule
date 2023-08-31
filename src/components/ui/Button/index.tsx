import { tv } from 'tailwind-variants';

const button = tv({
  base: 'button',
  variants: {
    color: {
      primary: 'primary',
      outline: 'outline',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

type ButtonProps = {
  children: React.ReactNode;
  variant?: keyof typeof button.variants.color;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <button className={button({ color: variant })} {...props}>
      {children}
    </button>
  );
};

export default Button;
