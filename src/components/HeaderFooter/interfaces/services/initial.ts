export namespace InitialService {
  export interface IProps {
    countries: ICountry[];
    currencies?: ICurrency[];
    currentSelection: ICurrentSelection;
    headerItems: {
      navItemLinks: INavLink[];
    };
    footerItems: IFooterItems;
    optionParameters: IOptionParams;
  }

  export interface ICountry {
    id: string;
    cobrandedId: number;
    cultureCode: string;
  }

  export interface ICurrency {
    cobrandedId: number;
    code: string;
    symbol: string;
    name: string;
  }

  export interface ICurrentSelection {
    brand: {
      code: string;
      author: string;
    };
    cobrandedId: number;
    cultureCode: string;
    currencyCode: string;
  }

  export interface INavLink {
    id: string;
    url: string;
    resourceText: string;
  }

  export interface IFooterItems {
    footerLinks: INavLink[];
    footerSubscription: {
      id: string;
      url: string;
    };
  }

  export interface IOptionParams {
    advantioUrl: string;
    enableSelectLanguage: boolean;
    enableSelectCurrencies?: boolean;
    facebookPluginUrl: string;
    facebookUrl: string;
    showAdvantioLogo: boolean;
    showPCILogo: boolean;
    showSocialNetworks: boolean;
  }
}
