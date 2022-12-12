import csv from 'csv-parser'
import fs from 'fs'
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { cache } from '../config/cache';
export const csvImport = async () => {
    try {
        const list: Array<any> = [];
        const filePath = path.resolve(__dirname, '../asset/data.csv')
        console.log(filePath)

        await new Promise((resolve, reject) => {

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => list.push(data))
                .on("error", reject)
                .on('end', async () => {
                    await Promise.all(list);
                    resolve(list)
                })
        })
        const santized = JSON.parse(JSON.stringify(list).replace(/"\s+|\s+"/g, '"'))

        const result = santized.map((item: any) => {

            return {
                _id: uuidv4(),
                time: item.time || null,
                date: item.date || null,
                latitude: item.latitude || null,
                longitude: item.longitude || null,
                wheather_condition: item.wheather_condition || null,
                light_condition: item.light_condition || null,
                visibility: item.visibility || null
            }

        })

        cache.set('accident_list', JSON.stringify(result))
        console.log("Successfully imported csv data")
        return result
    } catch (err) {
        console.log(err)
        return null
    }
}