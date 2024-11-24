import { State } from "@ai16z/eliza";

export interface EternumState extends State {
    gameDescription: string;
    worldState: string;
    queriesAvailable: string;
    availableActions: string;
}
