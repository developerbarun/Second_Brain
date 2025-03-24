import { Button } from "./components/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

const onClickHandler = async () => {
//   try {
//     const response = await fetch("https://api.example.com/add-content", {
//       method: "POST",
//     });
//     console.log("API Response:", await response.json());
//   } catch (error) {
//     console.error("Error calling API:", error);
//   }
};
function App() {
  return (
    <>
    <Button varient="primary" size="md" text = "Add Content" onClick={onClickHandler} startIcon={<PlusIcon size= "md"/>} endIcon={<ShareIcon size="md"/>}/><br></br>
    <Button varient="secondary" size="lg" text = "Share" onClick={onClickHandler} startIcon={<PlusIcon size= "lg"/>} endIcon={<ShareIcon size="lg"/>}/>
    <Button varient="secondary" size="sm" text = "Share" onClick={onClickHandler} startIcon={<PlusIcon size= "sm"/>} endIcon={<ShareIcon size="sm"/>}/>

    </>
  )
}

export default App; 