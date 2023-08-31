import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import Link from 'next/link';

const Register = () => {
  return (
    <>
      <InputText id="email" label="Login" placeholder="e-mail" />
      <InputText id="password" label="Senha" placeholder="senha" type="password" />
      <InputText
        id="password-confirmation"
        label="Confirme sua senha"
        placeholder="digite sua senha novamente"
        type="password"
      />

      <div className="buttons-wrapper">
        <Button>Registrar</Button>
        <p className="alternative-link">
          Já possui uma conta? <Link href="/user/login">Faça login</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
