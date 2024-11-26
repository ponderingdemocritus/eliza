import { CairoOption, CairoOptionVariant } from "starknet";

const calldata = [
    1,
    2,
    3,
    {
        Some: 1,
    },
];

let newCalldata = calldata.map((item) => {
    if (typeof item === "object" && ("Some" in item || "None" in item)) {
        if ("Some" in item) {
            if (item.Some === 0) {
                return new CairoOption<Number>(CairoOptionVariant.None, 0);
            }
            return new CairoOption<Number>(CairoOptionVariant.Some, item.Some);
        } else {
            return new CairoOption<Number>(CairoOptionVariant.None, 0);
        }
    }
    return item;
});

console.log(newCalldata);
