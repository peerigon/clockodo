import {setup} from "axios-cache-adapter";
import {Clockodo} from "../internals/api";
import {axiosClient} from "../internals/utilities/symbols";

const cachePlugin = (config: {cacheTime: number}) => (clockodo: Clockodo) => {
    if (typeof config.cacheTime !== "number") {
        throw new Error("Clockodo cacheTime expected to be a number, is typeof: " + typeof config.cacheTime);
    }
    clockodo[axiosClient] =
        setup({
            baseURL: clockodo[axiosClient].defaults.baseURL,
            headers: clockodo[axiosClient].defaults.headers,
            cache: {
                maxAge: config.cacheTime,
                exclude: {query: false},
            },
        });
};

export default cachePlugin;
