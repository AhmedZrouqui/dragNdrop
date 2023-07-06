export interface ITableType {
  id: string;
  value: string;
}
export interface IAppContext {
  isMobile: boolean;
  isDesktop: boolean;
  leftRef: any;
  rightRef: any;
  inputs: Array<IInputType>;
  handleCreateInput: (v: IInputType) => void;
  handleInputChange: (obj: Pick<IInputType, 'id' | 'value'>) => void;
  handleMoveInput: (obj: Pick<IInputType, 'id' | 'target'>) => void;
  getRightSideData: () => ITableType[];
}

export interface IInputType {
  target: string;
  value: string;
  id: string;
}
