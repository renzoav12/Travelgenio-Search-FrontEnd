import axios from '../api/search/search';
import { SearchResponse } from '../reducers/searchBoxSearchReducer';

export interface ShoppingService {
    search(checkIn: String): Promise<Array<SearchResponse>>;
}

export class RestShoppingService implements ShoppingService {
    public async search(checkIn: String): Promise<Array<SearchResponse>> {
        return axios.get("/rates");
        
    }
}

export default RestShoppingService;