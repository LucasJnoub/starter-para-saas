// import { auth, currentUser } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import { clerkClient, useUser } from "@clerk/nextjs";


// export async function getUserEmail() {
//     // const {userId} = auth();
//     // let userEmail:any
    
    
//     // if(!userId || !currentUser) return new NextResponse("Unauthorized", { status: 401 });
//     //  const userEmailId = auth().user?.primaryEmailAddressId;
//     //  if(userEmailId){

//     //       userEmail =  await clerkClient.emailAddresses.getEmailAddress(userEmailId);
//     //  }
     

//     const email = useUser().user?.primaryEmailAddress



//     return new NextResponse(userEmail, { status: 200 });

// }