
import axios from "axios";

const journalApi = axios.create({
    baseURL: 'https://vue-demos-b81f7-default-rtdb.firebaseio.com'
})

export default journalApi;