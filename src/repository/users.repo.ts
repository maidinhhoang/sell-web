import UsersModel from '~/models/users.model';
import { BaseRepository } from '.';

const UsersRepository = { ...BaseRepository(UsersModel) };

export default UsersRepository;
