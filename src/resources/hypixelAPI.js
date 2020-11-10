const HypixelAPI = require("hypixel-api");

const client = new HypixelAPI(process.env.hypixelKey);

async function getUser(name) {
    try {
        return await client.getPlayer("name", name);
    } catch {
        return undefined;
    }
};
/** @type {import("./hypixelAPI")} */
export default getUser;