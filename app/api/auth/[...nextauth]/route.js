import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import User from "@models/user";
import { connectToDB } from "@utils/database";
import Google from "next-auth/providers/google";

if (!process.env.GOOGLE_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Google OAuth client ID and client secret are required. Make sure to set them in your environment variables.");
}

async function getSessionUser() {
    const session = await getSession();
    if (session && session.user) {
        return await User.findOne({ email: session.user.email });
    }
    return null; // Return null if session or session.user is undefined
}


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        })
    ],
    callbacks: {
    async session({session}) {
        //store the user id from MongooDB to session
        const sessionUser = await User.findOne({email: session.user.email});
        session.user.id = sessionUser._id.toString();

        return session;
    },

    async signIn({account, profile, user, credentials}){
        try {
            await connectToDB();
            
            //if user exists
            const userExists = await User.findOne({
                email: profile.email
            });

            //create new one if doesnt
            if(!userExists) {

                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ","").toLowerCase(),
                    image: profile.picture
                });
            }
            
            return true;

        } catch(error){

            console.log(error);
            return false;
        }

    },
}

})

export {handler as GET, handler as POST};