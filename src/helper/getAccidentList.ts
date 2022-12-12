import { cache } from "../config/cache"

export const getAccidentList = async () => {
    try {
        const data = await cache.get('accident_list') as string

        return data ? JSON.parse(data) : undefined
    } catch (err) {
        console.log(err)
        return undefined
    }
}