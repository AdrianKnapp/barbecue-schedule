import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import Link from 'next/link';

const Login = () => {
  return (
    <>
      <InputText id="email" label="Login" placeholder="e-mail" />
      <InputText id="password" label="Senha" placeholder="senha" type="password" />
      <div className="buttons-wrapper">
        <Button>Entrar</Button>
        <p className="alternative-link">
          Não possui uma conta? <Link href="/user/register">Cadastre-se</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
