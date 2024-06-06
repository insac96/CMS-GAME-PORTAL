import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type < 1) throw 'Bạn không phải quản trị viên'

    const { _id } = await readBody(event)
    if(!_id) throw 'Dữ liệu đầu vào không đủ'

    const game = await DB.Game
    .findOne({ _id: _id })
    .select('content') 

    if(!game) throw 'Trò chơi không tồn tại'
    return res(event, { result: game.content })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})