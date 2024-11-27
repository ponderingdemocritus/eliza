import { Account, RpcProvider } from "starknet";

// const calldata = [1, 2, 3];

// let newCalldata = calldata.map((item) => {
//     if (typeof item === "object") {
//         if ("Some" in item) {
//             // If Some is 0, return None, otherwise return Some with the value
//             return item.Some === 0
//                 ? new CairoOption<Number>(CairoOptionVariant.None, 0)
//                 : new CairoOption<Number>(CairoOptionVariant.Some, item.Some);
//         } else if ("None" in item) {
//             return new CairoOption<Number>(CairoOptionVariant.None, 0);
//         }
//     }
//     return item;
// });

export const getStarknetProvider = () => {
    return new RpcProvider({
        nodeUrl: "http://localhost:5050",
    });
};

export const getStarknetAccount = () => {
    return new Account(
        getStarknetProvider(),
        "0x2088b4697de119d174f2a3443180eee129847aebe95c0074e8029a6b9348b6d",
        "0x28574b31ea893999db7feef48dde91c7c3faa14ad5c5499c321dc6086c50092"
    );
};

// {
//     "contractAddress": "0x36b82076142f07fbd8bf7b2cabf2e6b190082c0b242c6ecc5e14b2c96d1763c",
//     "entrypoint": "create",
//     "calldata": [
//         "69",
//         "1",
//         "5",
//         "3",
//         "1"
//     ]
// }

const { transaction_hash } = await getStarknetAccount().execute({
    contractAddress:
        "0x36b82076142f07fbd8bf7b2cabf2e6b190082c0b242c6ecc5e14b2c96d1763c",
    entrypoint: "create",
    calldata: ["62", "1", "3", "4", "0"],
});

await getStarknetAccount().waitForTransaction(transaction_hash, {
    retryInterval: 1000,
});
