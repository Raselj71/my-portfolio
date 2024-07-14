import { NextResponse } from "next/server";

export async function GET(request:Request) {


   

    return NextResponse.json({message:"send successfull"})
    
}

export async function POST(request:Request){

    console.log(await request.json())

    return NextResponse.json({status:"OK"})
}