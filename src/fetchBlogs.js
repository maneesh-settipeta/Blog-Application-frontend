import { baseURL } from "./URL";
import axios from "axios";
const fetchBlogs = async () => {
    try {
        const response = await axios.get(`${baseURL}/blogs`);

        if (response.status === 200) {

            return response.data.blogs;
        }
    } catch (error) {
        console.error("Error While fetching from db", error);
        return [];
    }

}
export default fetchBlogs;
