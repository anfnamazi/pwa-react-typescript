import { FunctionComponent, useState } from "react";
import Child from "./Child";

interface BailoutProps {}

const Bailout: FunctionComponent<BailoutProps> = () => {
  const [test, setTest] = useState<string>();

  const handleClick = () => {
    setTest("click");
  };
  
  console.log(test);

  return (
    <>
      <button onClick={handleClick}>Test Bailout</button>
      <Child />
    </>
  );
};

export default Bailout;
