import axios from "axios";
const axiosInstance = axios.create({
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
    },
    validateStatus: () => {
        return true;
    },
});
const checkUrl = (url) => url.indexOf("youtube.com") !== -1 || url.indexOf("youtu.be") !== -1;
const channelIdHandler = async (url) => {
    if (checkUrl(url)) {
        try {
            const ytChannelPageResponse = await axiosInstance.get(url);
            const channelIdMatch = ytChannelPageResponse.data.match(/"channelId":"([a-zA-Z0-9_-]+)"/);
            if (channelIdMatch) {
                return channelIdMatch[1];
            }
            else {
                console.error("Channel ID not found in the page HTML.");
            }
        }
        catch (err) {
            console.error("Error fetching YouTube channel page:", err);
        }
    }
    else {
        console.error("Invalid URL.");
    }
    return "";
};
export async function getChannelIdfromChannelUrl(req, res) {
    let { url } = req.body;
    console.log(url);
    if (url === undefined) {
        res.status(400).json({ message: "Bad Request" });
        return;
    }
    //   //   getChannelIdFromUrl(url);
    let channelId = await channelIdHandler(url);
    if (channelId === "") {
        res.status(400).json({ message: "Bad Request" });
        return;
    }
    res.status(200).json({ channelId });
}
//# sourceMappingURL=getChannelId.js.map