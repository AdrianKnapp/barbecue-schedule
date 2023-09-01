import Guest from './Guest';
import AddGuest from './AddGuest';

const BarbecueGuestsList = () => {
  return (
    <div className="barbecue-guests-list-container">
      <p className="guests-list-title">Lista de convidados</p>
      <Guest name="João" price={20} id="1" />
      <Guest name="Maria" price={10} id="2" />
      <Guest name="Julia" price={20} id="3" />
      <AddGuest />
    </div>
  );
};

export default BarbecueGuestsList;
