import { getUser } from "./hypixelAPI";

declare function getUser(name: string): Promise<Map>;

export = getUser;