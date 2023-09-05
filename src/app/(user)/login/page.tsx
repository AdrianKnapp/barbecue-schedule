'use client';

import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import { type UserRequestData } from '@/types/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
  return data;
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      setIsLoading(true);
      await loginUser({
        email,
        password,
      });

      router.push('/');
    } catch (err) {
      console.warn(err);
    } finally {
      setIsLoading(false);
    }
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
        <Button type="submit" loading={isLoading}>
          Entrar
        </Button>
        <p className="alternative-link">
          Não possui uma conta? <Link href="/register">Cadastre-se</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
