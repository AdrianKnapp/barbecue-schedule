import Button from '@/components/ui/Button';
import InputText from '@/components/ui/Inputs/InputText';
import BarbecueGuestsList from '../BarbecueGuestsList';

const CreateBarbecueForm = () => {
  return (
    <div className="create-barbecue-form">
      <h3 className="title">Adicionar Churras</h3>
      <InputText id="description" label="Descrição" placeholder="Qual o motivo do churrasco?" />
      <InputText id="date" label="Quando vai ser?" type="date" />
      <InputText id="additional-info" label="Informações adicionais" placeholder="Algum adendo?" />
      <p className="guests-list-title">Lista de convidados</p>
      <BarbecueGuestsList />
    </div>
  );
};

export default CreateBarbecueForm;
