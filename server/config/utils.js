export const extractedId = (objID) => {
    return JSON.stringify(objID).replaceAll('"', '')
}

export const bloodTypes = ['a', 'a-', 'b', 'b-', 'ab', 'ab-', 'o', 'o-']

export const cookieConfig = {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    secure,
    sameSite: 'None'
}