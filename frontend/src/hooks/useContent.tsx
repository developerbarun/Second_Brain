import axios from "axios";
import { useEffect, useState } from "react"

export const useContent = () => {
    const [contents,setContents] = useState([]);

    function refresh(){
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((response) => {
            setContents(response.data.content)
        }).catch((e) => {
            console.log("Error Fetched", e);
            
        });
    }

    useEffect(() => {
        refresh()
        let time = setInterval(() => {
            refresh
        },10*1000);

        return () => {
            clearInterval(time);
        }
    },[])
    return {contents,refresh};
}