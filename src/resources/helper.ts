// helper functions
import path from "path";

export let commandName = (pathToFile: string): string => {
    const filename = path.basename(pathToFile).slice(0,-3);
    return filename;
};