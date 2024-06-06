import { Types } from 'mongoose'
import type { IDBUser } from '../model'

export interface IAuth {
  _id: Types.ObjectId
  username: string
  type: number
}

export interface IRes {
  code? : number
  message?: string
  result?: any
}

export interface IFormatDate {
  day: number
  month: number
  year: number
  hour: number
  minute: number
  timestamp: number
  source: any
  dayjs: any
}