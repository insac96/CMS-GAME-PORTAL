export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig(event)
    deleteCookie(event, 'token-auth', runtimeConfig.public.COOKIE_CONFIG)
    return res(event, { message: 'Đăng xuất thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})