import { Clockodo } from "../internals/api";
declare const cachePlugin: (config: {
    cacheTime: number;
}) => (clockodo: Clockodo) => void;
export default cachePlugin;
