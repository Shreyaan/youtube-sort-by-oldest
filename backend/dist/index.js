import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import { getSortedVideos, getSortedVideosNOLIMIT } from "./controllers/getSortedVideos.js";
import { getChannelIdFromVideoUrl } from "./controllers/getChannelIdFromVideoUrl.js";
import { getChannelIdfromChannelUrl } from "./controllers/getChannelId.js";
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
export { database };
const PORT = process.env.PORT || 3002;
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.post("/api/v1/getSortedVideos/:id", getSortedVideos);
app.post("/api/v1/getSortedVideosNOLIMIT/:id", getSortedVideosNOLIMIT);
app.post("/api/v1/getChannelIdFromVideoUrl", getChannelIdFromVideoUrl);
app.post("/api/v1/getChannelIdFromChannelUrl", getChannelIdfromChannelUrl);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
//# sourceMappingURL=index.js.map