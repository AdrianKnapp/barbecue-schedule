type DateProps = {
  date: string;
};

const BarbecueDate = ({ date }: DateProps) => {
  return <p className="date">{date}</p>;
};

export default BarbecueDate;
