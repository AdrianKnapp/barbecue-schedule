'use client';

import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import { type UserRequestData } from '@/types/user';
import Link from 'next/link';
import { useForm, type SubmitHandler } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

const registerUser = async ({ email, password }: UserRequestData) => {
  const response = await fetch('/api/users/register', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();
  return data;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    await registerUser({
      email,
      password,
    });
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

      <div className="buttons-wrapper">
        <Button type="submit">Registrar</Button>
        <p className="alternative-link">
          Já possui uma conta? <Link href="/login">Faça login</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
