import CustomersModel from '~/models/customers.model';
import { BaseRepository } from '.';

const CustomersRepository = { ...BaseRepository(CustomersModel) };

export default CustomersRepository;
