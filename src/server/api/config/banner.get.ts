import { IDBConfig } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const config = await DB.Config.findOne().select(`name description image.og`) as IDBConfig
    if(!config) throw 'Không tìm thấy cấu hình trang'

    const user = await DB.User.count()
    const game = await DB.Game.count()

    return res(event, { result: { config, user, game } })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})