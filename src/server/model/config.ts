import type { Mongoose } from 'mongoose'
import type { IDBConfig } from '~~/types'

export const DBConfig = (mongoose : Mongoose) => {
  const schema = new mongoose.Schema<IDBConfig>({ 
    name: { type: String, default: 'ENI Games' },
    short_name: { type: String, default: 'EG' },
    description: { type: String, default: 'Cổng game trực tuyến đa nền tảng với vô vàn tựa game hấp dẫn' },
    image: {
      og: { type: String },
      app: { type: String },
      logo: { type: String },
    },

    about: { type: String },
    privacy: { type: String },
    terms: { type: String },

    contact: {
      name: { type: String, default: '' },
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      address: { type: String, default: '' },
      prefix: { type: String, default: 'EG' },
    },
    
    social: {
      fanpage: { type: String },
      group: { type: String },
      messenger: { type: String },
      zalo: { type: String },
      tiktok: { type: String },
      telegram: { type: String },
    },

    facebook: {
      client_id: { type: String, default: '' },
      client_secret: { type: String, default: '' },
      client_version: { type: String, default: '' },
      client_verify: { type: String, default: '' },
      client_ads: { type: String, default: '' },
    },
    google: {
      client_id: { type: String, default: '' },
      client_secret: { type: String, default: '' },
      client_verify: { type: String, default: '' },
      client_ads: { type: String, default: '' },
    },
    tiktok: {
      client_id: { type: String, default: '' },
      client_secret: { type: String, default: '' },
      client_verify: { type: String, default: '' },
    },
    zalo: {
      client_id: { type: String, default: '' },
      client_secret: { type: String, default: '' },
      client_verify: { type: String, default: '' },
    }
  }, {
    timestamps: true
  })

  const model = mongoose.model('Config', schema, 'Config')

  const autoCreate = async () => {
    const count = await model.count({})
    if(count == 0) return await model.create({})
  }
  autoCreate()

  return model 
}