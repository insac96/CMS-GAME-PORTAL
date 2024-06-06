import type { Model } from 'mongoose'
export { IDBConfig, IDBConfigStore } from './config'
export { IDBUser, IDBUserStore } from './user'
export { IDBGate } from './gate'
export { IDBPayment } from './payment'
export { IDBNews, IDBNewsCategory } from './news'
export { IDBGamePlatform, IDBGameCategory, IDBGame } from './game'
export { IDBLogAdmin, IDBLogLogin, IDBLogUser } from './log'

export interface IGlobalDB {
  Config: Model<IDBConfig>

  User: Model<IDBUser>

  News: Model<IDBNews>
  NewsCategory: Model<IDBNewsCategory>

  GamePlatform: Model<IDBGamePlatform>
  GameCategory: Model<IDBGameCategory>
  Game: Model<IDBGame>

  Gate: Model<IDBGate>
  Payment: Model<IDBPayment>

  LogAdmin: Model<IDBLogAdmin>
  LogUser: Model<IDBLogUser>
  LogLogin: Model<IDBLogLogin>
}