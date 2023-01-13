import { NextFunction, Request, Response } from 'express'
import { getAccidentList } from '../helper/getAccidentList'
import createHttpError from 'http-errors'
import { csvImport } from '../helper/csvImport'

export default {
  hasCSV: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const list = await getAccidentList()
      res.json(list > 0)
    } catch (err) {
      next(err)
    }
  },
  singleAccident: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      if (!id) throw createHttpError(400, 'Invalid params!')
      const list = await getAccidentList()
      if (!list || list.length === 0)
        throw createHttpError(404, 'Accident list not found!')
      const result = list.filter((item: any) => item._id === id)
      if (!result || result.length === 0 || !result[0])
        throw createHttpError(404, 'Data not found!')
      res.json(result[0])
    } catch (err) {
      next(err)
    }
  },
  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        date,
        longitude,
        latitude,
        weather_condition,
        light_condition,
        visibility,
      } = req.query

      const list = await getAccidentList()
      if (!list || list.length === 0)
        throw createHttpError(404, 'accident list not found!')

      const result = list.filter((item: any) => {
        let match = false

        if (Number(longitude)) {
          match = Number(item.longitude) === Number(longitude)
        }

        if (Number(latitude)) {
          match = Number(item.latitude) === Number(latitude)
        }

        if (weather_condition) {
          match = item.weather_condition === weather_condition
        }

        if (light_condition) {
          match = item.light_condition === light_condition
        }

        if (Number(visibility)) {
          match = Number(item.visibility) === Number(visibility)
        }

        if (date) {
          match = item.date === date
        }
        return match
      })

      res.json({ result, total: (result && result.length) || 0 })
    } catch (err) {
      next(err)
    }
  },

  uploadCsv: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file

      if (!file) throw createHttpError(400, 'File not uploaded')
      const data = await csvImport()
      if (!data) throw createHttpError(400, 'Failed to extract csv data')
      res.json('Successfully imported and parsed csv data')
    } catch (err) {
      next(err)
    }
  },
}
