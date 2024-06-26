import type { Mongoose } from 'mongoose'
import type { IGlobalDB } from '~~/types'

import { DBConfig } from './config'
import { DBUser } from './user'
import { DBGamePlatform, DBGameCategory, DBGame } from './game'
import { DBLogAdmin, DBLogUser, DBLogLogin } from './log'
import { DBNews, DBNewsCategory } from './news'
import { DBGate } from './gate'
import { DBPayment } from './payment'

export default (mongoose : Mongoose) : IGlobalDB => {
  return {
    Config: DBConfig(mongoose),

    User: DBUser(mongoose),

    News: DBNews(mongoose),
    NewsCategory: DBNewsCategory(mongoose),

    Gate: DBGate(mongoose),
    Payment: DBPayment(mongoose),

    GamePlatform: DBGamePlatform(mongoose),
    GameCategory: DBGameCategory(mongoose),
    Game: DBGame(mongoose),

    LogUser: DBLogUser(mongoose),
    LogAdmin: DBLogAdmin(mongoose),
    LogLogin: DBLogLogin(mongoose)
  }
}