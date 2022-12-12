export const PORT = process.env.APP_PORT || 4000

export const APP_ORIGIN = `http://localhost:${PORT}`

export const IN_PROD = process.env.NODE_ENV === 'production'

export const IN_STAGING = process.env.NODE_ENV === 'test'
