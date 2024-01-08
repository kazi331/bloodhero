export const extractedId = (objID) => {
    return JSON.stringify(objID).replaceAll('"', '')
}

export const bloodTypes = ['a', 'a-', 'b', 'b-', 'ab', 'ab-', 'o', 'o-']

export const cookieConfig = {
    httpOnly: true,
    secure: true,
    // maxAge: 1000 * 60 * 60 * 24, // 1 days 
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24) // 1 day
}