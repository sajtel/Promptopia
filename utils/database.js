import mongoose from 'mongoose';

let isConnected = false; //track connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('MonogoDB is already connected');
        return;
    }


    try{
        await mongoose.connect(process.env.MONGODB_URI, {

            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB connected')

        
    } catch(error){
        isConnected = false;
        console.log('Error connecting to MongoDB',error)

    }
}