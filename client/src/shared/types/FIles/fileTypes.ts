export enum FileTypes {
    UP_DIR = 'Наверх',
    DIR = 'Папка',
    FILE = 'Файл'
}

export type KeysFileTypes = keyof typeof FileTypes

export interface IFile {
    name: string
    type: KeysFileTypes
}