export const extractedId = (objID) => {
    return JSON.stringify(objID).replaceAll('"', '')
}

export const tokenConfig = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 days 
}