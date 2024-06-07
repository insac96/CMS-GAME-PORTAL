import type { H3Event } from 'h3'
import type { Types } from 'mongoose'
import md5 from 'md5'
import axios from 'axios'

export default async (username: string, password: string, type: string) => {
  try{
    if(type == 'sy12306'){
      const url = 'http://api.sy12306.com/oauth/mrkendyUserReg'
      const send : any = {
        'app_id': 100,
        'client_id': 520809,
        'format': 'json',
        'mem-password': password,
        'mem-username': username,
        'key': 'czum4yx94la8ssqeo6o17k3whvxb0wu7'
      }
      const sendStr = new URLSearchParams(send).toString()
      const sign = md5(sendStr)
      send.sign = sign
      delete send['key']

      const result = await axios.post(url, send)
      const data = result.data
      if(data.code == 200){
        // console.log(send)
        // console.log(data)
        return true
      }
      else {
        throw false
      }
      
    }
  }
  catch(e : any){
    return false
  }
  
}