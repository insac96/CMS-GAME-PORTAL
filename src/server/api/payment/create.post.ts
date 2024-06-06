import md5 from "md5"
import type { IAuth, IDBConfig, IDBGame, IDBGate, IDBUser } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth

    // Check Body
    const body = await readBody(event)
    const { game, gate, card, money } = body
    if(!gate || !card || !game) throw 'Dữ liệu đầu vào không hợp lệ'
    if(!!isNaN(parseInt(money)) || parseInt(money) < 1) throw 'Số tiền không hợp lệ'
    if(parseInt(money) < 20000) throw 'Số tiền phải lớn hơn hoặc bằng 20.000đ'
    if(parseInt(money) % 10000 != 0) return 'Số tiền phải là bội số của 10.000'
    if(parseInt(money) > 50000000) throw 'Số tiền nhập vào quá lớn'

    // Config
    const config = await DB.Config.findOne({}).select('short_name') as IDBConfig
    if(!config) throw 'Không tìm thấy cấu hình trang'

    // Check User
    const user = await DB.User.findOne({ _id: auth._id }).select('_id') as IDBUser
    if(!user) throw 'Không tìm thấy thông tin tài khoản'

    // Check Count Waiting
    // const countWait = await DB.Payment.count({ user: user._id, status: 0 })
    // if(countWait > 0) throw 'Bạn đang có giao dịch nạp tiền chưa hoàn thành, vui lòng hủy nó trước nếu bạn chưa thực hiện'

    // Check Game
    const gameSelect = await DB.Game
    .findOne({ _id: game })
    .select('display') as IDBGame
    if(!gameSelect) throw 'Trò chơi không tồn tại'
    if(!gameSelect.display) throw 'Trò chơi đang bảo trì'

    // Check Gate
    const gateSelect = await DB.Gate
    .findOne({ _id: gate })
    .select('name number person type key qrcode callback display') as IDBGate
    if(!gateSelect) throw 'Kênh nạp không tồn tại'
    if(!gateSelect.display) throw 'Kênh nạp đang bảo trì'

    // Make Code, Token
    const countPayment = await DB.Payment.count()
    const prefix = config.short_name ? config.short_name.trim().toUpperCase() : 'PAY'
    const code = prefix + (countPayment > 9 ? countPayment : `0${countPayment}`) + Math.floor(Math.random() * (99 - 10) + 10)
    const token = md5(`${code}-${Date.now()}`)
    
    // Make QR
    let qrcode
    if(!!gateSelect.qrcode && gateSelect.type != 1){
      qrcode = gateSelect.qrcode
      qrcode = qrcode.replaceAll('[money]', String(parseInt(money)))
      qrcode = qrcode.replaceAll('[code]', code)
      qrcode = qrcode.replaceAll('[token]', token)
      qrcode = qrcode.replaceAll('[gate-name]', gateSelect.name)
      qrcode = qrcode.replaceAll('[gate-number]', gateSelect.number)
      qrcode = qrcode.replaceAll('[gate-person]', gateSelect.person)
    }

    // Check Card
    if(gateSelect.type == 1){
      if(!gateSelect.key) throw 'Kênh thẻ cào đang bảo trì'
      if(!card.net || !card.seri || !card.pin) throw 'Thông tin thẻ cào không hợp lệ'

      await checkCard(event, {
        net: card.net,
        seri: card.seri,
        pin: card.pin,
        money: parseInt(money),
        token: token,
        key: gateSelect.key
      })
    }

    // Create
    const payment = await DB.Payment.create({
      user: auth._id,
      gate: gateSelect._id,
      game: gameSelect._id,
      card: card,
      money: parseInt(money),
      code: code,
      token: token,
      qrcode: qrcode
    })

    return res(event, { message: 'Tạo giao dịch thành công', result: payment._id })
  } 
  catch (e:any) {
    return res(event, { code: 400, message: e.toString() })
  }
})
