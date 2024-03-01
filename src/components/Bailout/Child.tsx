import { FunctionComponent } from "react";

interface ChildProps {
    
}
 
const Child: FunctionComponent<ChildProps> = () => {
    console.log("Bailout Child renderd!");
    
    return ( 
        <>Bailout Child</>
     );
}
 
export default Child;