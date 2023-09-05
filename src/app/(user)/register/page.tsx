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
  passwordConfirmation: string;
};

const registerUser = async ({ email, password }: UserRequestData) => {
  try {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    return await response.json();
  } catch (err) {
    console.warn(err);

    return {
      error: 'Erro ao fazer cadastro.',
    };
  }
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      setIsLoading(true);
      const response = await registerUser({
        email,
        password,
      });

      const { error } = response;

      if (error) {
        setError(error);
        return;
      }

      router.push('/login');
    } catch (err) {
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
        id="password"
        label="Senha"
        placeholder="senha"
        type="password"
        {...register('password', {
          required: true,
        })}
        error={errors.password}
      />
      <InputText
        id="password-confirmation"
        label="Confirme sua senha"
        placeholder="digite sua senha novamente"
        type="password"
        {...register('passwordConfirmation', {
          required: true,
          validate: (value: string) => {
            if (watch('password') !== value) {
              return 'As senhas não coincidem.';
            }
          },
        })}
        error={errors.passwordConfirmation}
        errorMessage={errors.passwordConfirmation?.message}
      />
      {error && <p className="form-error">{error}</p>}
      <div className="buttons-wrapper">
        <Button type="submit" loading={isLoading}>
          Registrar
        </Button>
        <p className="alternative-link">
          Já possui uma conta? <Link href="/login">Faça login</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
