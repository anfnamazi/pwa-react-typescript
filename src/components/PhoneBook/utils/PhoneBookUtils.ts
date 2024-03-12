import { IPerson, IReqPerson } from "../types/phoneBookTypes";

export function toString(person: IPerson): string {
  return `${person.name}: ${person.phone}`;
}

export function toObject(personStr: string): IReqPerson {
  return {
    name: personStr.split(":")[0].trim(),
    phone: +personStr.split(":")[1].trim(),
  };
}
