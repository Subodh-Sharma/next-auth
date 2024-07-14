import { connect } from "@/db/connection";
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try{
        const reqBody = await request.json();
        const {email,password} = reqBody;
        const user = await User.findOne({email:email});
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400});
        }
        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({error: "Invalid Credentials"},{status:400});
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{expiresIn:"7d"});
        const response = NextResponse.json({message: "Login Successfully",success:true});
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;

    }catch(error:any){
        return NextResponse.json({error: error.message},{status:500});
    }
}