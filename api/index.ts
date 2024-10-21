import axios from "axios";

const API_KEY = "46636114-aff6cc8fbe11b21e93697a195";
const API_URL = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (params) => {
    let url = `${API_URL}&per_page=25&safe_search=true&editors_choice=true`;
    if (!params) {
        return url;
    }
    const paramKeys = Object.keys(params);
    paramKeys.forEach((key) => {
        const value = key === "q" ? encodeURIComponent(params[key]) : params[key];
        url += `&${key}=${value}`;
    });
    return url;
};

export const apiCall = async (params) => {
    try {
        const formattedUrl = formatUrl(params);
        const response = await axios.get(formattedUrl);

        if (response.status === 200) {
            return response.data;
        }
    } catch (err) {
        console.log("Error:", err.message);
    }
};
