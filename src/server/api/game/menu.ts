export default defineEventHandler(async (event) => {
  try {
    const platform = await DB.GamePlatform.find().select('name icon key')
    const category = await DB.GameCategory.find().select('name icon key')
    
    return res(event, { result: { platform, category } })
  } 
  catch (e:any) {
    return res(event, { result: [] })
  }
})