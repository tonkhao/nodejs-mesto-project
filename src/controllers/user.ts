import User from '../models/user'

export const createUser = (req: any, res: any) => User.create({
  email: req.body.email,
  password: req.body.password,
})
  .then((user) => res.send(user))
  .catch((err) => res.status(400).send(err));