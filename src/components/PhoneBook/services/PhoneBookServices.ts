import { AxiosResponse } from "axios";
import http from "../../../api";
import { IPerson, IReqPerson } from "../types/phoneBookTypes";

export function getPhoneBook(): Promise<AxiosResponse<IPerson[]>> {
  return http.get("/phone_book");
}

export function postPerson(person: IReqPerson): Promise<AxiosResponse<any>> {
  return http.post("/phone_book", person);
}

export function patchPerson(
  id: string,
  person: IReqPerson
): Promise<AxiosResponse<any>> {
  return http.patch(`/phone_book/${id}`, person);
}

export function deleltePerson(id: string): Promise<AxiosResponse<any>> {
  return http.delete(`/phone_book/${id}`);
}
