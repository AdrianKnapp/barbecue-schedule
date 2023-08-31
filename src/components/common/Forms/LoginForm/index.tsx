import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import Link from 'next/link';

const LoginForm = () => {
  return (
    <div className="login-form-wrapper">
      <InputText id="email" label="Login" placeholder="e-mail" />
      <InputText id="password" label="Senha" placeholder="senha" type="password" />
      <div className="buttons-wrapper">
        <Button>Entrar</Button>
        <p className="alternative-link">
          Não possui uma conta? <Link href="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
