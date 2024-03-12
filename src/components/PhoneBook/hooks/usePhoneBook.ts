import { SyntheticEvent, useState } from "react";
import { useDidMount } from "rooks";
import {
  deleltePerson,
  getPhoneBook,
  patchPerson,
  postPerson,
} from "../services/PhoneBookServices";
import { IPerson, IReqPerson } from "../types/phoneBookTypes";
import { toObject, toString } from "../utils/PhoneBookUtils";

interface IUsePhoneBook {
  (): {
    persons: IPerson[];
    handleSubmit: (e: SyntheticEvent) => void;
    handleRemove: (id: string) => () => void;
    handleEdit: (id: string, person: IPerson) => () => void;
  };
}

const usePhoneBook: IUsePhoneBook = () => {
  const [persons, setPersons] = useState([]);

  /* #region Create */
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      phone: { value: string };
      name: { value: string };
    };
    const name = target.name.value.trim();
    const phone = +target.phone.value.trim();
    const person = { name, phone };
    createPerson(person);
  };

  const createPerson = async (person: IReqPerson): Promise<void> => {
    const { status } = await postPerson(person);
    if (status === 201) {
      updatePersons();
    }
  };
  /* #endregion */

  /* #region Edit */
  const handleEdit = (id: string, person: IPerson) => {
    return () => editPerson(id, person);
  };

  const editPerson = async (id: string, person: IPerson): Promise<void> => {
    const newInput = prompt(
      'Please enter changes with "name: phone" structure',
      toString(person)
    );
    const newPerson = toObject(newInput);
    const { status } = await patchPerson(id, newPerson);
    if (status === 200) {
      updatePersons();
    }
  };
  /* #endregion */

  /* #region Delete */
  const handleRemove = (id: string) => {
    return () => removePerson(id);
  };

  const removePerson = async (id: string): Promise<void> => {
    const { status } = await deleltePerson(id);
    if (status === 200) {
      updatePersons();
    }
  };
  /* #endregion */

  /* #region Update */
  const updatePersons = async () => {
    const { data } = await getPhoneBook();
    setPersons(data);
  };
  /* #endregion */

  useDidMount(updatePersons);

  return { persons, handleSubmit, handleRemove, handleEdit };
};

export default usePhoneBook;
