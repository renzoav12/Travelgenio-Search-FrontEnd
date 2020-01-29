export namespace SidebarService {
  export interface IProps {
    cobrandedID: number;
    cultureCode: string;
    showTaxDetails: string;
    taxDetails: Array<ITaxProps>;
    priceDetails: IPriceProps;
  }

  export interface IPriceProps {
    currencyCode: string;
    currencyName: string;
    currencyBeforeAmount: boolean;
    currencySymbol: string;
    formattedTotal: string;
    total: number;
    fareDetails: IFareProps;

    errorCode?: number;
    errorDescription?: string;
  }

  export interface ITaxProps {
    HasDescriptions: boolean;
    TaxDetailList: [];
  }

  export interface ICalculationProps {
    type: string;
    resource: string;
    value: number;
    formattedValue: string;
  }

  export interface IFareProps {
    calculations: Array<ICalculationProps>;
  }
}
