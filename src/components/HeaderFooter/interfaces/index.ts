//import { ErrorProps } from "next/error";
//import { TFunction } from "next-i18next";
//import { Actions } from "../reducers/actions";
import { SidebarService } from "./services/sidebar";
import { ProductService } from "./services/products";
import { ItineraryService } from "./services/itinerary";
import { InitialService } from "./services/initial";
import { SecondaryService } from "./services/secondary";
import { Dispatch, SetStateAction } from "react";
import { TooltipProps } from "@material-ui/core/Tooltip";
import { StandardProps, TooltipClassKey } from "@material-ui/core";

// Export Services
export * from "./services/initial";
export * from "./services/sidebar";
export * from "./services/products";
export * from "./services/itinerary";
export * from "./services/secondary";
export * from "./services/upsellingPost";

// Pages
export interface IAppProps {
  pageProps: any;
  initialData?: InitialService.IProps;
  countries?: InitialService.ICountry[];
  currencies?: InitialService.ICurrency[];
}

export interface IHomeProps { }

export interface ILoadingProps { }

export interface IContinueProps {
  //t: TFunction;
  path?: string;
}

export interface IUpsellingProps {
  sessionToken: string;
  sidebar: SidebarService.IProps;
  products: ProductService.IProps;
  secondary: SecondaryService.IProps;
  itinerary: ItineraryService.IProps;
  namespacesRequired: string[];
}

export interface ICustomerProps {
  sessionToken: string;
  sidebar: SidebarService.IProps;
  secondary: SecondaryService.IProps;
  itinerary: ItineraryService.IProps;
  namespacesRequired: string[];
}

export interface IErrorProps {
  statusCode: number;
  namespacesRequired?: string[];
}

// Store
export interface IUser {
  selection: {
    cultureCode: string;
    currencyCode: string;
    cobrandedId: number;
  };
  countries: InitialService.ICountry[];
  currencies: InitialService.ICurrency[];
  loading: boolean;
  products: {
    freeText: string;
    additional: IUserAdditionals;
  };
}

export interface IUserProduct {
  productID: string;
  itemID: string;
}

export interface IUserAdditionals {
  [key: string]: IUserProduct;
}

export interface ICurrentSelection {
  brand: {
    code: string;
    author: string;
  };
  cultureCode: string;
  currencyCode: string;
}

export interface ICurrency {
  code: string;
  symbol: string;
  name: string;
}

export interface ICulture {
  id: string;
  cobrandedId: number;
  cultureCode: string;
}

export interface ILanguage {
  CobrandedID: number;
  CultureCode: string;
  language: string;
}

export interface IFareDetail {
  text: string;
  value: string;
  productID: string;
}

export interface IItinerary {
  loading: boolean;
  itineraryService: string;
  priceDetails: {
    total: string;
    fareDetails: IFareDetail[];
  };
}

export interface IState {
  user: IUser;
  itinerary: IItinerary;
}

export interface IStore {
  state: IState;
  //dispatch: React.Dispatch<Actions>;
}

export interface IStoreProviderProps {
  children: React.ReactNode;
}

// Components
export interface IHeaderProps {
  initialData: InitialService.IProps;
  countries: InitialService.ICountry[];
  currencies: InitialService.ICurrency[];
}

export interface IBannerProps {
  initialData: InitialService.IProps;
  countries: InitialService.ICountry[];
  currencies: InitialService.ICurrency[];
}

export interface ICountrySelectorProps {
  countries: InitialService.ICountry[];
  currentSelection: ICurrentSelection;
 }

export interface ICurrencySelectorProps {
  initialData: InitialService.IProps;
  currencies: InitialService.ICurrency[];
}

export interface INavProps {
  initialData: InitialService.IProps;
}

export interface IBreadcrumbProps {
  details: SecondaryService.IProps;
}

export interface IPreviousItemProps {
  url: string;
  item: SecondaryService.IBreadcrumb;
}

export interface IFooterProps {
  initialData: InitialService.IProps;
  countries: InitialService.ICountry[];
}

export interface ILanguageChooserProps { }

export interface IMetaProps {
  brand: {
    code: string;
    author: string;
  };
}

export interface IUpsellingPriceProps {
  //t: TFunction;
  itinerary: ItineraryService.IProps;
  sidebar: SidebarService.IProps;
}

export interface IDangerouslyInnerHTML {
  __html: string;
}

// Itinerary

export interface IItineraryProps {
  itinerary: ItineraryService.IProps;
}

export interface IBaggage extends StandardProps<React.HTMLAttributes<HTMLDivElement>, TooltipClassKey> {
  section: ItineraryService.ISectionProps;
}

export interface ISectProps {
  section: ItineraryService.ISectionProps;
}

export interface ITotalDetailsProps {
  //t: TFunction;
  helpers: IUsePriceProps;
  sidebar: SidebarService.IProps;
}

export interface IUsePriceProps {
  open: boolean;
  totalPrice: string;
  pricebarClass: string;
  handleClick: () => void;
  fareDetails: IFareDetail[];
  stickyPos?: "top" | "bottom";
  prices: SidebarService.ICalculationProps[];
  formatCurrency: () => IDangerouslyInnerHTML;
}

export interface IArrowTooltipProps extends JSX.IntrinsicAttributes, TooltipProps { }

export interface IPriceTooltipProps extends JSX.IntrinsicAttributes, TooltipProps {
  helpers: IUsePriceProps;
  sidebar: SidebarService.IProps;
}

// Navbar
export interface INavItem {
  textTrKey: string;
  URL: string;
}

export interface INavbarProps {
  links: INavLink[];
}

export interface IDrawerProps {
  //t: TFunction;
  links: INavLink[];
}

export interface INavLink {
  id: string;
  url: string;
  resourceText: string;
}

// Customer Service Components
export interface ICS_Props {
  product: ProductService.ICustomerService;
}

export interface ITabPanelProps {
  index: any;
  value: any;
  dir?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface IGridMenuProps {
  //t: TFunction;
  selected: IUserProduct;
  details: ProductService.ICustomerService;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ITabMenuProps {
  //t: TFunction;
  selected: IUserProduct;
  details: ProductService.ICustomerService;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IUseCServiceProps {
  value: number;
  loading: boolean;
  openDialog: boolean;
  handleOpen: () => void;
  moreInfo: IProductMoreInfo[];
  setValue: React.Dispatch<React.SetStateAction<number>>;
  componentClass: (item: ProductService.ICS_Item) => string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeTab: (_e: React.ChangeEvent<{}>, value: number) => void;
  setMoreInfo: React.Dispatch<React.SetStateAction<IProductMoreInfo[]>>;
}

// Products Props
export interface IAdditionalProductProps {
  product: ProductService.IProduct;
}

export interface IItem {
  text: string;
}

export interface IProductMoreInfo {
  id: string;
  name: string;
  resources: IItem[];
}

export interface ICSMoreInfoDialogProps {
  open: boolean;
  fullScreen: boolean;
  moreInfo: IProductMoreInfo[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}

// Logos

export interface ILogo {
  title?: string;
  description?: string;
  width?: string;
  height?: string;
}
