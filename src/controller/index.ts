import { Request, Response } from 'express'
import { getAccidentList } from '../helper/getAccidentList'
import createHttpError from 'http-errors'


export default {
    post: async (req: Request, res: Response) => {
        try {
            const { longitude } = req.body
            console.log(req.body)
            const parsedLongitude = Number(longitude)
            // const parsedLatitude = parseInt(latitude)

            const list = await getAccidentList()
            if (!list || list.length === 0) throw createHttpError(404, 'accident list not found!')
            // const result = []


            const result = list.filter((item: any) => {
                console.log(longitude, Number(item.longitude), item.longitude)
                return longitude && Number(item.longitude) === parsedLongitude
            });


            res.json({ result })
        } catch (err) {
            console.log(err)
        }

    }
}
