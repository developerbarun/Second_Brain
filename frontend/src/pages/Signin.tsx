import { useRef } from "react";
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/v1/user/signin",{
            username,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token",jwt);
        navigate("/dashboard")
    }

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input reference={usernameRef} placeholder="username"/>
            <Input reference={passwordRef}  placeholder="password"/>
            <div>
                <Button loading = {false} varient="primary" text="Signin" fullWidth={true} size="md" onClick={signin}/>
            </div>
        </div>
    </div>
}