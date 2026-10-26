export const SplitPath = (path) => {
    let fileName = null, fileType = null

    fileName = (path).split('\/')
    fileName = fileName[fileName.length - 1]
    fileType = fileName.split('.')
    fileType = fileType[fileType.length - 1]

    if (fileType == 'pdf' || fileType == 'docx' || fileType == 'txt') {
        fileType = 'text'
    } else if (fileType == 'mp4') {
        fileType = 'video'
    } else if (fileType == 'mp3') {
        fileType = 'audio'
    } else if (fileType == 'jpeg' || fileType == 'jpg' 
            || fileType == 'png' || fileType == 'gif' ) {
        fileType = 'image'
    } else {
        fileType = 'other'
    }

    return {
        filetype: fileType,
        filename: fileName,
    }
}