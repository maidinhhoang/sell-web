import MerchantsModel from '~/models/merchants.model';
import { BaseRepository } from '.';

const MerchantsRepository = { ...BaseRepository(MerchantsModel) };

export default MerchantsRepository;
