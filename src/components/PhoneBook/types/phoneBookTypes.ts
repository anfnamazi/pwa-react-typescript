export interface IReqPerson {
  phone: number;
  name: string;
}

export interface IPerson extends IReqPerson {
  id: string;
}
