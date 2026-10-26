export default {
    whichPattern: (ltiValuePattern) => {
        let pattern = null, test = null
        let patternTwoOptions = /^(navigation|test\(\d+\))[\s]*\+[\s]*(test\(\d+\)|navigation)$/gi
        let patternOneOption = /^(navigation|test\(\d+\))$/gi

        test = patternTwoOptions.exec(ltiValuePattern)

        if (test) {
            pattern = 'PATTERN1'
        } else if (!test) {
            test = patternOneOption.exec(ltiValuePattern)

            if (test) {
                if (test[0] == 'navigation') {
                    pattern = 'PATTERN3'
                } else {
                    pattern = 'PATTERN2'
                }
            } else {
                pattern = 'PATTERN3'
            }
        }

        return pattern
    },
    extractTestNumber: (ltiValue) => {
        let test = /test\(\d+\)/gi.exec(ltiValue)

        if (test) {
            return test[0].split('(')[1].split(')')[0]
        } else {
            return null
        }
    }
}