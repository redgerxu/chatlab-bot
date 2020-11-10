// helper functions
import path from "path";

export let commandName = (pathToFile: string): string => {
    const filename = path.basename(pathToFile).slice(0,-3);
    return filename;
};

export let formatTime = (t: any): string => {
    const date = new Date(t);
    return `${date!.getMonth() + 1}/${date!.getDate()}/${date!.getUTCFullYear()}`;
};