export default defineEventHandler(async (event) => {
  try {
    const list = await DB.GameCategory.find().select('name key')
    return res(event, { result: list })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})