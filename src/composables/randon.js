export const Random = (length) => {
    const options = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
    let token = '' 

    for(let i = 0; i < length; i++) { 
        token += options[Math.floor(Math.random() * options.length)]
    }

    return token
}