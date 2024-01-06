export const extractedId = (objID) => {
    return JSON.stringify(objID).replaceAll('"', '')
}

export const bloodTypes = ['a', 'a-', 'b', 'b-', 'ab', 'ab-', 'o', 'o-']

export const tokenConfig = {
    httpOnly: true,
    secure: true,
    // maxAge: 24 * 60 * 60 * 1000 // 1 days 
    // maxAge: 60 * 1000,
    expiresIn: 60 * 1000,
}