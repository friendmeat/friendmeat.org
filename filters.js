/**
 * 
 * @param {string} path UNIX-style path to image
 * @returns URI-encoded string
 */
export function getStem(path){
    return encodeURI(path.split("/").at(-1).split(".").at(0));
}