export const extractedId = (objID) => {
    return JSON.stringify(objID).replaceAll('"', '')
}

export const bloodTypes = ['a', 'a-', 'b', 'b-', 'ab', 'ab-', 'o', 'o-']

export const cookieConfig = {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true
}