export namespace SecondaryService {
  export interface IBreadcrumb {
    id: string;
    url?: string;
    current?: boolean;
    resourceText: string;
  }

  export interface IProps {
    stepCode: string;
    pathToReturn?: string;
    waitingMessage: string;
    stepCodeToReturn?: string;
    breadcrumb: IBreadcrumb[];
  }
}
