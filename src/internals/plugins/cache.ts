import {setup} from "axios-cache-adapter";
import {Clockodo} from "../api";
import {axiosClient} from "../utilities/symbols";

const cachePlugin = (config: {cacheTime: number}) => (clockodo: Clockodo) => {
    if (typeof config.cacheTime === "number") {
        clockodo[axiosClient] =
        setup({
            baseURL: clockodo[axiosClient].defaults.baseURL,
            headers: clockodo[axiosClient].defaults.headers,
            cache: {
                maxAge: config.cacheTime,
                exclude: {query: false},
            },
        });
    }
};

export default cachePlugin;
