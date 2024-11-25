import { elizaLogger, IAgentRuntime } from "@ai16z/eliza";
import { createDojoConfig } from "@dojoengine/core";
import { Account, RpcProvider } from "starknet";
import devManifest from "../../../../../contracts/manifest_dev.json";

const VITE_PUBLIC_MASTER_ADDRESS =
    "0x01BFC84464f990C09Cc0e5D64D18F54c3469fD5c467398BF31293051bAde1C39";
const VITE_PUBLIC_MASTER_PRIVATE_KEY =
    "0x075362a844768f31c8058ce31aec3dd7751686440b4f220f410ae0c9bf042e60";
const VITE_PUBLIC_ACCOUNT_CLASS_HASH =
    "0x07dc7899aa655b0aae51eadff6d801a58e97dd99cf4666ee59e704249e51adf2";
const VITE_PUBLIC_TORII = "https://api.cartridge.gg/x/eternum-rc-sepolia/torii";
const VITE_PUBLIC_NODE_URL = "https://api.cartridge.gg/x/starknet/sepolia";
const VITE_PUBLIC_TORII_RELAY =
    "/dns4/api.cartridge.gg/tcp/443/x-parity-wss/%2Fx%2Feternum-rc-sepolia%2Ftorii%2Fwss";

interface GraphQLResponse<T> {
    data?: T;
    errors?: Array<{
        message: string;
        locations?: Array<{
            line: number;
            column: number;
        }>;
        path?: string[];
    }>;
}

async function queryGraphQL<T>(
    endpoint: string,
    query: string,
    variables?: Record<string, unknown>
): Promise<T | Error> {
    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const result = (await response.json()) as GraphQLResponse<T>;

        if (result.errors) {
            return new Error(result.errors[0].message);
        }

        if (!result.data) {
            return new Error("No data returned from GraphQL query");
        }

        return result.data;
    } catch (error) {
        elizaLogger.error("GraphQL query failed:", error);
        return error instanceof Error
            ? error
            : new Error("Unknown error occurred");
    }
}

export const fetchData = async (
    query: string,
    variables: Record<string, unknown>
) => {
    return await queryGraphQL<string>(VITE_PUBLIC_TORII + "/graphql", query, {
        variables,
    });
};

export const dojoConfig = createDojoConfig({
    rpcUrl: VITE_PUBLIC_NODE_URL,
    toriiUrl: VITE_PUBLIC_TORII,
    relayUrl: VITE_PUBLIC_TORII_RELAY,
    masterAddress: VITE_PUBLIC_MASTER_ADDRESS,
    masterPrivateKey: VITE_PUBLIC_MASTER_PRIVATE_KEY,
    accountClassHash:
        VITE_PUBLIC_ACCOUNT_CLASS_HASH ||
        "0x07dc7899aa655b0aae51eadff6d801a58e97dd99cf4666ee59e704249e51adf2",
    feeTokenAddress: "0x0",
    manifest: devManifest,
});

// export const eternumProvider = new DojoProvider(dojoConfig);

export const getStarknetProvider = (runtime: IAgentRuntime) => {
    return new RpcProvider({
        nodeUrl: runtime.getSetting("STARKNET_RPC_URL") || "",
    });
};

export const getStarknetAccount = (runtime: IAgentRuntime) => {
    return new Account(
        getStarknetProvider(runtime),
        runtime.getSetting("STARKNET_ADDRESS") || "",
        runtime.getSetting("STARKNET_PRIVATE_KEY") || ""
    );
};

// export const callEternum = async (
//     runtime: IAgentRuntime,
//     call: Call
// ): Promise<any> => {
//     return eternumProvider.execute(
//         getStarknetAccount(runtime),
//         call,
//         "eternum"
//     ) as Promise<any>;
// };
