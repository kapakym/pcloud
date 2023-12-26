class FileUtils {
    static buildPath = (homeFolder?: string | any, currentPath?: string) => {
        if (typeof homeFolder !== 'string') return ''
        if (homeFolder) homeFolder = homeFolder.replace('.', '') + '/';
        else return ''
        if (currentPath) currentPath = currentPath.replace('.', '') + '/';
        else currentPath = ""
        return process.env.CLOUD_PATH + '/' + homeFolder + currentPath
    }
}

export default FileUtils