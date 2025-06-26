import mongoose from 'mongoose';
import userSchema from '../models/user'
import IUser from '../models/user'

interface ICard {
  name: string,
  link: string,
  owner: typeof IUser
}


const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }]
});


export default mongoose.model<ICard>('card', cardSchema);