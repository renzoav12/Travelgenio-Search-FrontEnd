import { AccommodationRateModel } from '../reducers/accommodationRateSearchReducer';
import axios from './../api';

export interface ShoppingService {
    search(checkIn: String): Promise<Array<AccommodationRateModel>>;
}

export class RestShoppingService implements ShoppingService {
    public async search(checkIn: String): Promise<Array<AccommodationRateModel>> {
        return axios.get("/rates");
    }
}

export default RestShoppingService;