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

type LoginUserResponse = {
  error?: string;
  message?: string;
};

const loginUser = async ({ email, password }: UserRequestData): Promise<LoginUserResponse> => {
  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (err) {
    console.warn(err);

    return {
      error: 'Erro ao fazer login',
    };
  }
};

const Login = () => {
  const [error, setError] = useState<string | null>(null);
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
      const response = await loginUser({
        email,
        password,
      });

      const { error } = response;

      if (error) {
        setError(error);
        return;
      }

      router.push('/');
    } catch (err) {
      console.log('🚀 ~ file: page.tsx:63 ~ constonSubmit:SubmitHandler<Inputs>= ~ err:', err);
      console.warn(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
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
      {error && <p className="form-error">{error}</p>}
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
