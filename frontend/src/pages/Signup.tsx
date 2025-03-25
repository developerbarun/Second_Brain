import { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios";
import { useNavigate } from "react-router-dom";



export const Signup = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup(){
        const name = nameRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/v1/user/signup",{
            name,
            username,
            password
        })
        navigate("/dashboard")
        alert("You have signedup")
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={nameRef} placeholder="Name"/>
            <Input reference = {usernameRef}  placeholder="Username"/>
            <Input reference = {passwordRef}  placeholder="Password"/>
            <div>
                <Button loading = {false} varient="primary" text="Signup" fullWidth={true} size="md" onClick={signup}/>              
            </div> 
        </div>
    </div>
}