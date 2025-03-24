import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { CreateContentModel } from "../components/CreateContentModel";
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../components/Card";
import { ShareIcon } from "../icons/ShareIcon";
import { useContent } from "../hooks/useContent";
import axios from "axios";


function Dashboard() {
  const [modelOpen,setModelOpen]  = useState(false);
  const {contents,refresh} = useContent();
  useEffect(() => {
    refresh();
  },[modelOpen])
  const a = 1;
  return (
    <div>
        <Sidebar/>
      <div className="p-4 min-h-screen ml-72 bg-gray-100 border-2">
      <CreateContentModel open={modelOpen} onClose={() => {
        setModelOpen(false);  
      }}/>
      
      <div className="flex justify-end gap-4">
        <Button varient="primary" size="md" onClick={() => {setModelOpen(true)}} text = "Add Content" startIcon={<PlusIcon size="md"/>}/>
        <Button onClick={async() => {const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/share`,{
          share : true
        },{
          headers : {
            "Authorization" : localStorage.getItem("token")
          }
        });
        const shareUrl =`http://localhost:5173/api/v1/brain/${response.data.hash}`;
        alert(shareUrl)
        }} varient="secondary" size="md" text="Share" startIcon={<ShareIcon size = "md"/>}/>
      </div>
      <div className="flex gap-4 flex-wrap">
        {contents.map(({title,link,type}) => <Card key={a + 1} type = {type} link = {link} title = {title}/>
        )}
      </div>
      </div>
    </div>
  )
}

export default Dashboard; 