import { type BarbecueModel } from '@/types/barbecue';
import mongoose, { Schema } from 'mongoose';

const barbecueSchema = new Schema(
  {
    id: String,
    userId: String,
    name: String,
    description: String,
    date: String,
    value: Number,
    amountRaised: Number,
    guests: Array,
    price: {
      drinkIncluded: Number,
      drinkNotIncluded: Number,
    },
  },
  {
    timestamps: true,
  },
);

const Barbecue = mongoose.models.Barbecue ?? mongoose.model<BarbecueModel>('Barbecue', barbecueSchema);

export default Barbecue;
