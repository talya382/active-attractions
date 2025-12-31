import mongoose from "mongoose"
export function connectToDB() {
    mongoose.connect(process.env.DB, {
        userNewUrlParse: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("Connect to dataBase");
        })
        .catch((err) => {
            console.log("Error connecting dataBase", err);
            process.exit(1);
        });
}