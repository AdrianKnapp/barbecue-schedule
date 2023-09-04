'use client';

import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import { type UserRequestData } from '@/types/user';
import Link from 'next/link';
import { useForm, type SubmitHandler } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

const loginUser = async ({ email, password }: UserRequestData) => {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();
  console.log('🚀 ~ file: page.tsx:28 ~ registerUser ~ data:', data);
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await loginUser({
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        defaultValue="email"
        id="email"
        label="Login"
        placeholder="e-mail"
        {...register('email', {
          required: true,
        })}
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
