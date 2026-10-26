export const getIndexProperty = (data) => {
    const properties = /^([a-zA-Z_\d]+)\(([a-zA-Z_\d]+)\)$/.exec(data)

    if (!properties) throw('There is a problem with the pattern')

    return {
        group: properties[1],
        page: properties[2]
    }
}

export const getTextToIndex = (data, name) => {
    let index = null

    for (let i = 0; i < data.length; i++) {
        if (data[i] == name) {
            index = i

            break
        }
    }

    return index
}

export const getPositionNavigation = (data, name) => {
    const navigation = {
        previous: null,
        current: name,
        next: null,
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i] == name) {
            if (i > 0) navigation.previous = data[i - 1]

            if (i < data.length - 1) navigation.next = data[i + 1]
        }   
    }

    return navigation
}