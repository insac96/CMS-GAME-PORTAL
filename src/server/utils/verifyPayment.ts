import type { H3Event } from 'h3'
import type { Types } from 'mongoose'
import { IDBGame, IDBGate, IDBPayment, IDBUser } from '~~/types'

interface IBodyData {
  _id: Types.ObjectId,
  status: number,
  money: number,
  reason: string
}

export default async (
  event: H3Event, 
  { _id, status, money, reason } : IBodyData, 
  verifier? : Types.ObjectId,
  sendNotify : boolean = true
) : Promise<void> => {
  if(!_id) throw 'Không tìm thấy ID giao dịch'
  if(
    !!isNaN(parseInt(String(status))) 
    || parseInt(String(status)) < 1 
    || parseInt(String(status)) > 2
  ) throw 'Mã trạng thái không hợp lệ'
  if(
    !!isNaN(parseInt(String(money))) 
    || parseInt(String(money)) < 0 
  ) throw 'Số tiền không hợp lệ'
  if(status == 2 && !reason) throw 'Không tìm thấy lý do từ chối'

  // Set Real Value
  const realMoney = parseInt(String(money))
  const realStatus = realMoney == 0 ? 2 : status
  const realReason = reason || 'Giao dịch không hợp lệ'

  // Get Payment
  const payment = await DB.Payment
  .findOne({ _id: _id })
  .select('code game gate user status') as IDBPayment
  if(!payment) throw 'Giao dịch không tồn tại'
  if(payment.status > 0) throw 'Không thể thao tác trên giao dịch này'

  // Get Other
  const user = await DB.User.findOne({ _id: payment.user }).select('level referral paymusty paydays') as IDBUser
  if(!user) throw 'Không tìm thấy thông tin tài khoản'
  const gate = await DB.Gate.findOne({ _id: payment.gate }).select('bonus') as IDBGate
  if(!gate) throw 'Không tìm thấy thông tin kênh nạp'
  const game = await DB.Game.findOne({ _id: payment.game }).select('name') as IDBGame
  if(!game) throw 'Không tìm thấy thông tin trò chơi'

  // Set Verify Person
  let verify_person
  if(!!verifier){
    verify_person = verifier
  }
  else {
    const bot = await DB.User.findOne({'username': 'bot'}).select('_id')
    verify_person = bot._id
  }

  // Update Payment
  const time = new Date()
  await DB.Payment.updateOne({ _id: _id }, {
    money: realMoney,
    status: realStatus,
    verify: {
      person: verify_person,
      time: time,
      reason: realReason
    }
  })

  // Check Status
  if(realStatus == 1){
    if(!!verifier) logAdmin(event, `Chấp nhận giao dịch nạp tiền <b>${payment.code}</b> với số tiền <b>${realMoney.toLocaleString('vi-VN')}</b> cho trò chơi <b>${game.name}</b>`, verifier)
  }
  else {
    if(!!verifier) logAdmin(event, `Từ chối giao dịch nạp tiền <b>${payment.code}</b> với lý do <b>${realReason}</b> cho trò chơi <b>${game.name}</b>`, verifier)
  }
}