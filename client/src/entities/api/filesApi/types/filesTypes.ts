export interface ResponseGetFiles {
    path: string,
    folders: string[]
    files: Array<{ name: string, type: string, size: number }>
}

export interface ResponseGetFilesShare extends ResponseGetFiles {
    token?: string
}