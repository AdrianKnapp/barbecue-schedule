import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';

const LoginForm = () => {
  return (
    <div className="login-form-wrapper">
      <InputText id="email" label="Login" placeholder="e-mail" />
      <InputText id="password" label="Senha" placeholder="senha" />
      <Button>Entrar</Button>
    </div>
  );
};

export default LoginForm;
