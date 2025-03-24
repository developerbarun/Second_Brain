// import { Button } from "./components/Button";
import { useState } from "react";
import { Card } from "./components/Card";
import { CreateContentModel } from "./components/CreateContentModel";
import { Button } from "./components/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";



function App() {
  const [modelOpen,setModelOpen]  = useState(false);
  return (
    <div className="p-4">
      <CreateContentModel open={modelOpen} onClose={() => {
        setModelOpen(false);
      }}/>
      
      <div className="flex justify-end gap-4">
        <Button varient="primary" size="md" onClick={() => {setModelOpen(true)}} text = "Add Content" startIcon={<PlusIcon size="md"/>}/>
        <Button varient="secondary" size="md" text="Share" startIcon={<ShareIcon size = "md"/>}/>
      </div>
      <div className="flex gap-4">
        <Card type = "twitter" link = "" title = "first video"/>
        <Card type = "youtube" link = "" title = "first video"/>
      </div>
    </div>
  )
}

export default App; 