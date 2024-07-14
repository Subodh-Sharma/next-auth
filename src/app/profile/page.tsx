"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfilePage(){
    const router = useRouter();
    const [data,setData] = React.useState();
    const logout = async()=>{
        try{
            await axios.get("/api/users/logout");
            router.push('/login');
        }catch(error:any){
            console.log(error);
        }
    }
    const getUserDetails = async()=>{
            const user = await axios.get("/api/users/myself");
            setData(user.data.data._id);
            console.log(user.data.data._id);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile Page</p>
            <h2>{data ? <Link href={`/profile/${data}`}>{data}</Link>: "NO Data" }</h2>
            <button onClick={getUserDetails} className="bg-orange-500 mt-4 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Get Data</button>
            <button onClick={logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
    )
}
