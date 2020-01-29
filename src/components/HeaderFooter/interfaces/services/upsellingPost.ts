export namespace UpsellingPostService {
  export interface IUpsellingPostResponse {
    url: string;
  }

  export interface IUpsellingPostProduct {
    productId: string;
    itemId: string;
  }

  export interface IUpsellingPostRequest {
    freeText: string;
    productList: Array<IUpsellingPostProduct>;
  }
}
