import ltiPattern from './ltiPattern.js'

export default  {
    setExternalLink: (object) => {
        unasus.pack.setPersistence('EXTERNAL_LINK', object)
    },
    setDownload: (obj) => {
        let fileName = null, fileType = null

        fileName = (obj.href).split('\/')
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

        unasus.pack.setPersistence('DOWNLOAD', {
            filetype: fileType,
            filename: fileName,
            current: obj.current,
        })
    },
    setStatusDefault: () => {
        const status = unasus.pack.getStatus()
        
        let object = {
            status: 'attended',
            percentage: 0,
            LTIvalue: 0
        }

        if (!status) {
            unasus.pack.setStatus(object)

            return  object
        } else {
            return status
        }
    },
    setStatusPages: (source) => {
        let statusPages = unasus.pack.getPersistence('STATUS_PAGES')

        if (!statusPages) {
            let pages = {}, status = { total: 0 }

            for (let property in source) {
                pages[property] = []
    
                for (let quantity = 0; quantity < source[property].length; quantity++) {
                    pages[property].push(false)
                    status.total += 1
                }

                status[property] = false
            }

            unasus.pack.setPersistence('STATUS_PAGES', pages)

            return {
                pages: pages,
                status
            }
        } else {
            let status = { total: 0 }

            for (let property in source) {
                status[property] = false
                status.total += source[property].length
            }

            return {
                pages: statusPages,
                status
            }
        }
    },
    setStatusPage: (database, property, index) => {
        if (!database.statusPages[property][index]) {
            const pages = database.statusPages[property]
            const pagesLength = pages.length
            let statusChecked = false

            database.statusPages[property][index] = true

            for (let i = 0; i < pagesLength; i++) {
                if (pages[i]) {
                    statusChecked = true
                } else {
                    statusChecked = false
                    break
                }
            }

            if (statusChecked) { 
                database.statusPagesExtra[property] = true
            }

            unasus.pack.setPersistence('STATUS_PAGES', database.statusPages)
        }
    },
    setPercentage: (database, config) => {
        const total = database.statusPagesExtra.total
        let wasAccesed = 0, percentage = null, pattern = null, lengthTest = null

        if (database.status.percentage < 100) {
            for (let property in database.statusPages) {
                for (let i = 0; i < database.statusPages[property].length; i++) {
                    if (database.statusPages[property][i]) {
                        wasAccesed++
                    }
                }
            }
    
            percentage = +((wasAccesed / total) * 100).toFixed(3)
        }

        if (database.status.percentage != 100 && percentage != database.status.percentage) {
            pattern = ltiPattern.whichPattern(config.ltiValue)

            if (config.ltiValue == '' || config.ltiValue == null) {
                database.status.LTIvalue = percentage / 100
            } else {
                if (pattern == 'PATTERN3') {
                    database.status.LTIvalue = percentage / 100
                }
            }
    
            if (pattern == 'PATTERN1') {
                lengthTest = ltiPattern.extractTestNumber(config.ltiValue)
                database.status.LTIvalue = database.test.length / lengthTest / 2 + percentage / 100 / 2
            }

            if (database.status.LTIvalue == 1) {
                database.status.status = 'completed'
            }

            database.status.percentage = parseInt(percentage)
            database.status.LTIvalue = +database.status.LTIvalue.toFixed(3)

            unasus.pack.setStatus(database.status)
        }
    },
    setNavigation: (location) => {
        const navigation = unasus.pack.getPersistence('NAVIGATION') 

        if (!navigation) {
            unasus.pack.setPersistence('NAVIGATION', {
                current: location,
                previous: ''
            })
        } else {
            unasus.pack.setPersistence('NAVIGATION', {
                current: location,
                previous: navigation.current
            })
        }
    },
    setTestDefault: () => {
        const testControl = unasus.pack.getPersistence('TEST_CONTROL')

        if (!testControl) {
            unasus.pack.setPersistence('TEST_CONTROL', [])

            return []
        } else {
            return testControl
        }
    },
    setTestControl: (test, database, config) => {
        let status = true, aux = null, pattern = ltiPattern.whichPattern(config.ltiValue)
        let lengthTest = null

        for (let i = 0; i < database.test.length; i++) {
            if (database['test'][i] == test) {
                status = false
                
                break
            }
        }

        if (status) {
            database.test.unshift(test)
            unasus.pack.setPersistence('TEST_CONTROL', database.test)

            lengthTest = ltiPattern.extractTestNumber(config.ltiValue)

            if (pattern == 'PATTERN1') {
                database.status.LTIvalue = database.test.length / lengthTest / 2 + database.status.percentage / 100 / 2
            }

            if (pattern == 'PATTERN2') {
                database.status.LTIvalue = database.test.length / lengthTest
            }

            if (pattern == 'PATTERN1' || pattern == 'PATTERN2') {
                if (database.status.LTIvalue == 1) {
                    database.status.status = 'completed'
                }   

                if (database.status.LTIvalue <= 1) {
                    database.status.LTIvalue = +database.status.LTIvalue.toFixed(3)
                    unasus.pack.setStatus(database.status)
                }
            }
        }
    },
    getTestControl: (test, database) => {
        let status = false

        return new Promise((resolve, reject) => {
            for (let i = 0; i < database.length; i++) {
                if (database[i] == test) {
                    status = true

                    break  
                }
            }

            resolve(status)
        })
    }
}