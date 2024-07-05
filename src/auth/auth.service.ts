  

     
import { TSAuth,TIAuth,AuthenticationTable } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";

  export const createAuthUserService = async ( user:TIAuth): Promise<string | null> => {
    await db.insert(AuthenticationTable).values(user);
    return "user created created successfully";

  }

  export const userLoginService = async (user:TSAuth) => {
    const {email,password} = user;
    return await db.query.AuthenticationTable.findFirst({
      columns:{
        email: true,
        password:true,
        role:true,
        
      
      },where:sql `${AuthenticationTable.email } = ${email} `,
     with:{
      user:{columns:{
        user_id:true,
        created_at:true,
        updated_at:true,
        full_name:true,
        email:true, 
        contact_phone:true,
        address:true
      
      }

      }
     }
     
    })
  }