/* eslint-disable func-style */
import { Clockodo } from "../src/index";

const clockodo = new Clockodo({
    apiKey: "",
    user: ""
});

const func = passedFunction => {
    // eslint-disable-next-line promise/catch-or-return
    passedFunction.then(
        result => {
            console.log("The resolved value is:\n", result);

            return result;
        },
        err => {
            console.log(
                "Damn it, there was an error!\n",
                err.response.data.error
            );

            return err;
        }
    );
};

// func(clockodo.getTargetHours({userId: 56986}));
// func(clockodo.getAbsences({ year: 2020 }));
clockodo.getTargetHours({ userId: 56986 }).then(console.log);
