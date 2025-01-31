"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { loadStaticPaths } from "next/dist/server/dev/static-paths-worker";

export default function LoginPage (){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email: "",
        password: ""
    });
    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);

    const onLogin = async ()=>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Login Success",response.data);
            router.push("/profile");
        }catch(error:any){
            console.log("Login Failed",error.message);
        }finally{
            setLoading(false);
        }
    }

    React.useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading? "Processing":"Login"}</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input type="email" className="input" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder="Email"/>
            <hr />
            <label htmlFor="password">Password</label>
            <input type="password" className="input" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder="Password"/>
            <hr />
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onLogin}>{buttonDisabled ? "Fill Details Properly":"Login"}</button>
            <Link href="/signup">Don't have an account?</Link>
        </div>
    )
}