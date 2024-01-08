export const extractedId = (objID) => {
    return JSON.stringify(objID).replaceAll('"', '')
}

export const bloodTypes = ['a', 'a-', 'b', 'b-', 'ab', 'ab-', 'o', 'o-']

export const cookieConfig = {
    httpOnly: process.env.httpOnly,
    secure: process.env.secure,
    maxAge: process.env.maxAge,

}