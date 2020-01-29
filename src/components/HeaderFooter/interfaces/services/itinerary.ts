export namespace ItineraryService {
  export interface ISectionProps {
    airline: string;
    airlineDescrip: string;
    airlineImageName: string;
    classType: string;
    cabin: string;
    airplaneCode: string;
    airplaneName: string;
    flightN: string;
    scaleNumber: number;
    optionNumber: number;
    operatingCarrier: string;
    operatingCarrierName: string;
    depAirportCode: string;
    depAirport: string;
    depCity: string;
    depCountry: string;
    arrAirportCode: string;
    arrAirport: string;
    arrCity: string;
    arrCountry: string;
    depDate: string;
    arrDate: string;
    depTime: string;
    arrTime: string;
    time: string;
    formattedFlightTime: string;
    conex: string;
    direction: string;
    isStop: string;
    scaleTime: string;
    baggageQuantityOrWeight: string;
    isWeightedBaggage: boolean;
    baggageQuantity: number;
    baggageResource: string;
  }

  export interface IRouteProps {
    type: string;
    className: string;
    routeResource: string;
    scaleNumber: number;
    allowsBaggageDate: boolean;
    flightTime: string;
    dateStr: string;
    outAirport: string;
    outTime: string;
    daysDifference: number;
    retAirport: string;
    retTime: string;
    hasBaggageInformationDate: boolean;
    aircraftOptionGoingType: string;
    sections: Array<ISectionProps>;
  }

  export interface IFareProps {
    FareInfoNum: number;
    RuleNumber: number;
    RuleText: string;
  }

  export interface IProps {
    cultureCode: string;
    cobrandedID: number;
    optionNumber: number;
    tripType: string;
    routes: Array<IRouteProps>;
    fareRules: Array<IFareProps>;
  }
}
