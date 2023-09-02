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
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        defaultValue="email"
        {...register('email', {
          required: true,
        })}
        id="email"
        label="Login"
        placeholder="e-mail"
        error={errors.email}
      />
      <InputText
        {...register('password', {
          required: true,
        })}
        id="password"
        label="Senha"
        placeholder="senha"
        type="password"
        error={errors.password}
      />

      <div className="buttons-wrapper">
        <Button type="submit">Entrar</Button>
        <p className="alternative-link">
          Não possui uma conta? <Link href="/register">Cadastre-se</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
