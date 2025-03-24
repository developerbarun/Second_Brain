import { useRef, useState } from "react"
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import axios from "axios"

enum ContentType{
    Image = "image",
    Video = "video",
    Article = "article",
    Audio = "audio" 
}
export const CreateContentModel = ({open,onClose} : any) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type,setType] = useState(ContentType.Video);
    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,{
            title,
            link,
            type,
        },{
            headers:{
                "Authorization" : localStorage.getItem("token")
            }
        })
        onClose();
    }
    return <div>
        {open &&<div>
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">


            </div>

            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                <div className="flex flex-col justify-center">
                <span className="bg-white p-4 rounded-md fixed">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                            <CrossIcon/>
                        </div>
                    </div>
                    <div>
                        <Input reference={titleRef} placeholder = {"Title"}/>
                        <Input reference={linkRef} placeholder = {"Link"}/>
                    </div>
                    <div>   
                        <h1>Types</h1>
                        <div className="flex gap-1 justify-center pb-2" >
                            <Button text="Video" size="md" varient={type===ContentType.Video ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Video)
                            }}/>
                            <Button text="Article" size="md" varient={type===ContentType.Article ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Article)
                            }}/>
                            <Button text="Image" size="md" varient={type===ContentType.Image ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Image)
                            }}/>
                            <Button text="Audio" size="md" varient={type===ContentType.Audio ? "primary" : "secondary"} onClick={() => {
                                setType(ContentType.Audio)
                            }}/>

                        </div>
                    </div>
                    <div className="flex justify-center">
                    <Button varient= {"primary"} text="Submit" size="md" onClick={addContent} />
                    </div>
                </span>
            </div>

        </div>
        </div>}
    </div>    
}

