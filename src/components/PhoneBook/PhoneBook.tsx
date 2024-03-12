import { FunctionComponent } from "react";
import usePhoneBook from "./hooks/usePhoneBook";

interface PhoneBookProps {}

const PhoneBook: FunctionComponent<PhoneBookProps> = () => {
  const { persons, handleSubmit, handleRemove, handleEdit } = usePhoneBook();
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" name="name" />
        <input type="number" placeholder="phone" name="phone" />
        <button type="submit">&#10147;</button>
      </form>
      <ul>
        {persons.map((person) => (
          <li>
            {`${person.name}: ${person.phone}`}
            <button onClick={handleEdit(person.id, person)}>&#9998;</button>
            <button onClick={handleRemove(person.id)}>&#10006;</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PhoneBook;
