import axios from "axios";

const fetcher = (url: string) =>
 axios.get(url).then(resp=>resp.data);

export default fetcher;