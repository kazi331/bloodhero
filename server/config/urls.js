
export const clientURI = process.env.NODE_ENV === 'development' ? process.env.CLIENT_URL : process.env.CLIENT_URL_PROD
// export const mongoURI = process.env.NODE_ENV === 'development' ? process.env.MONGO_URI : process.env.MONGO_URI_PROD

export const mongoURI = process.env.MONGO_URI_PROD