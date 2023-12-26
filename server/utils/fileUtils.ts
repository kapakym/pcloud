class FileUtils {
    static buildPath = (homeFolder?: string, currentPath?: string) => {
        if (homeFolder) homeFolder = homeFolder.replace('.', '') + '/';
        else return ''
        if (currentPath) currentPath = currentPath.replace('.', '') + '/';
        return process.env.CLOUD_PATH + '/' + homeFolder + currentPath
    }
}

export default FileUtils