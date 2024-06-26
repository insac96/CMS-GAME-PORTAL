import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    const gates = await DB.Gate.find().select('name')
    return res(event, { result: gates })
  } 
  catch (e:any) {
    return res(event, { result: [] })
  }
})