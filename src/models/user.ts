import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  gender: {
    type: String,
    enum: ['м', 'ж', 'другой']
  },
  age: {
    type: Number,
    validate: {
      validator(v: number) {
        return v >= 18;
      },
      message: 'Вам должно быть больше 18 лет'
    }
  },
  about: String
})

export default mongoose.model('user', userSchema);