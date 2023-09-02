'use client';

import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        defaultValue="email"
        {...register('email', {
          required: false,
        })}
        id="email"
        label="Login"
        placeholder="e-mail"
      />
      {errors.email && <span>This field is required</span>}
      <InputText
        {...register('password', {
          required: false,
        })}
        id="password"
        label="Senha"
        placeholder="senha"
        type="password"
      />
      {errors.password && <span>This field is required</span>}

      <div className="buttons-wrapper">
        <Button type="submit">Entrar</Button>
        <p className="alternative-link">
          Não possui uma conta? <Link href="/user/register">Cadastre-se</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
