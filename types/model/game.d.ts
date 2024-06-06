import type { Types } from 'mongoose'

export interface IDBGamePlatform {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  name: string
  icon: string
  key: string
  display: boolean
}

export interface IDBGameCategory {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  name: string
  icon: string
  key: string
  display: boolean
}

export interface IDBGame {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  platform: Types.ObjectId | IDBGamePlatform
  category: Types.ObjectId | IDBGameCategory
  
  name: string
  short_name: string
  key: string
  description: string
  og_image: string
  images: Array<string>
  
  content: string
  download: {
    web: string
    windows: string
    android: string
    ios: string
  }

  view: number
  play: number
  
  pin: boolean
  display: boolean
}

