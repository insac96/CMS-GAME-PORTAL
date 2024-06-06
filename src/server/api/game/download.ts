import type { IDBGame } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const { game, type } = await readBody(event)
    if(!game || !type) throw 'Dữ liệu đầu vào sai'

    const gameData = await DB.Game
    .findOne({ _id: game })
    .select('download') as IDBGame

    if(!gameData) throw 'Trò chơi không tồn tại'

    // @ts-expect-error
    if(!gameData.download[type]) throw 'Chúng tôi đang cập nhật link tải, vui lòng quay lại sau'

    // @ts-expect-error
    return res(event, { result: gameData.download[type] })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})