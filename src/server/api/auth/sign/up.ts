import jwt from 'jsonwebtoken'
import md5 from 'md5'
import type { IDBConfig, IDBUser } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig()
    const { username, password, confirm } = await readBody(event)

    if (!username) throw 'Vui lòng nhập tài khoản'
    if (username.length < 6 || username.length > 15) throw 'Tài khoản trong khoảng 6-15 ký tự'
    if (!!username.match(/\s/g)) throw 'Tài khoản không có khoảng cách'
    if (!(/^[a-z0-9]*$/g).test(username)) throw 'Tài khoản không có ký tự đặc biệt và viết hoa'
    if (!!username.includes('admin')
      || !!username.includes('smod')
      || !!username.includes('robot')
    ) throw 'Tài khoản không hợp lệ'

    if (!password) throw 'Vui lòng nhập mật khẩu'
    if (password.length < 6 || password.length > 15) throw 'Mật khẩu trong khoảng 6-15 ký tự'
    if (!!password.match(/\s/g)) throw 'Mật khẩu không có khoảng cách'

    if (!confirm) throw 'Vui lòng nhập lại mật khẩu'
    if (confirm != password) throw 'Hai mật khẩu không trùng khớp'

    // Config
    const config = await DB.Config.findOne({}).select('image') as IDBConfig
    if(!config) throw 'Không tìm thấy cấu hình trang'

    // Check User
    const userCheck = await DB.User.findOne({ username: username }).select('_id') as IDBUser
    if(!!userCheck) throw 'Tài khoản đã tồn tại'

    // Reg Game
    const checkReg = await regGame(username, password, 'sy12306')
    if(!checkReg) throw 'Đăng ký tài khoản game không thành công'

    // Check IP
    const IP = getRequestIP(event, { xForwardedFor: true })

    // Create
    const user = await DB.User.create({
      username: username,
      password: md5(password),
      avatar: config.image.app || '/images/user/default.png',
    })

    // Make Token And Cookie
    const token = jwt.sign({
      _id : user._id
    }, runtimeConfig.TOKEN_SECRET, { expiresIn: '360d' })
    setCookie(event, 'token-auth', token, runtimeConfig.public.COOKIE_CONFIG)
    user.token = token
    await user.save()

    // Send Notify and Save Log
    logUser(event, user._id, 'Đăng ký tài khoản ')
    logUser(event, user._id, `Đăng nhập với IP <b>${IP}</b>`)

    return res(event, { message: 'Đăng ký thành công' })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})