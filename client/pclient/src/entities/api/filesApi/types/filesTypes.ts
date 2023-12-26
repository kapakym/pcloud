export interface ResponseGetFiles {
    path: string,
    folders: string[]
    files: Array<{ name: string, type: string, size: number }>

}