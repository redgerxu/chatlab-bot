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

export let randint = (max: number): number => {
    return Math.floor((Math.random() * max));
};

export let randprop = <T extends object>(obj: T) => {
    const keys = Object.keys(obj);
    const key = keys[randint(keys.length)];
  
    return obj[key as keyof T];
};

export let title = (str: string, separator?: string): string => {
    if (!separator) separator = "_";
    const s = str.split(separator);
    let gn:string[] = []; // too lazy to change var name
    for (const w of s) {
        gn.push(w[0].toUpperCase() + w.slice(1).toLowerCase());
    }
    return gn.join(" ");
};

export let yesno = (thing: boolean, values?: string[]): string => {
    if (!values) values = ["Yes","No"];
    if (thing) return values[0];
    return values[1];
};