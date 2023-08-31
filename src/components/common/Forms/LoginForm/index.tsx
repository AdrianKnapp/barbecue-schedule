import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';

const LoginForm = () => {
  return (
    <div className="login-form-wrapper">
      <InputText id="email" label="Login" placeholder="e-mail" />
      <InputText id="password" label="Senha" placeholder="senha" type="password" />
      <div className="buttons-wrapper">
        <Button>Entrar</Button>
        <Button variant="outline">Cadastre-se</Button>
      </div>
    </div>
  );
};

export default LoginForm;
