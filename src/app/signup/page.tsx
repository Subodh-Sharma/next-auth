"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage (){
    const router = useRouter();
    const [user,setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const onSignUp = async ()=>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("SignUp Successfully",response.data);
            router.push("/login");
        }catch(error:any){
            console.log(error.message);
        }finally{
            setLoading(false);
        }
    }
    React.useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading? "Sabar Krle": "SignUp Page"}</h1>
            <hr />
            <label htmlFor="username">User Name</label>
            <input type="text" className="input" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder="User Name"/>
            <hr />
            <label htmlFor="email">Email</label>
            <input type="email" className="input" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="Email"/>
            <hr />
            <label htmlFor="password">Password</label>
            <input type="password" className="input" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Password"/>
            <hr />
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onSignUp}>{buttonDisabled ? "Details bharle pehle BSDK":"Sign Up"}</button>
            <hr />
            <Link href="/login">Already have an account?</Link>
        </div>
    )
}