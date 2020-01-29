export namespace ProductService {
  export interface IProps {
    ssi: string;
    cobrandedID: number;
    cultureCode: string;
    coreSessionID: string;
    navigationPattern: string;
    stepCode: string;
    formPostAction: string;
    productList: IProduct[];
    customerService: ICustomerService;
  }

  export interface IProduct {
    order: number;
    productID: string;
    recommended: boolean;
    europeAssistance: boolean;
    items: IProductItem[];
    bannerInfo?: string;
    customInput: boolean;
    productDetails: IProductDetails;
  }

  export interface ICustomerService {
    productID: string;
    services: ICS_Service[];
    items: ICS_Item[];
  }

  export interface IProductItem {
    itemID: string;
    preselected: boolean;
    priceDetails: IPriceDetails;
  }

  export interface IProductDetails {
    title: string;
    subtitle?: string;
    description?: string;
    terms?: string;
    includes: string[];
  }

  export interface IPriceDetails {
    total: number;
    currencySymbol: string;
    formattedTotal: string;
    pricePerPassenger: number;
    isCostPerPassenger: boolean;
    formattedPricePerPassenger: string;
  }

  export interface ICS_Item {
    order: number;
    name: string;
    itemId: string;
    category: string;
    recommended: boolean;
    preselected: boolean;
    services: ICS_Service[];
    priceDetails: IPriceDetails;
  }

  export interface ICS_Service {
    id: string;
    value: string;
  }

  export interface ICS_IndexServices {
    [key: string]: ICS_Service;
  }
}
