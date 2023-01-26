import mongoose from 'mongoose'
import { HttpError } from '../../utils/api.utils'
import { HTTP_STATUS } from '../../constants/api.constants'

mongoose.set('strictQuery', true)

class MongoDAO {
  model

  constructor(collection, schema) {
    this.model = mongoose.model(collection, schema)
  }

  async getAll(filter = {}) {
    const documents = await this.model.find(filter, { __v: 0 }).lean()
    return documents
  }

  async getById(id: string) {
    const document = await this.model.findOne({ _id: id }, { __v: 0 })
    if (!document) {
      const message = `Resource with id ${id} not found`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return document
  }

  async save(item = {}) {
    const newDocument = new this.model(item)
    return await newDocument.save()
  }

  async update(id: string, item) {
    const updatedDocument = await this.model.updateOne({ _id: id }, { $set: { ...item } })
    if (!updatedDocument.matchedCount) {
      const message = `Resource with id ${id} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return updatedDocument
  }

  async delete(id: string) {
    const deletedDocument = await this.model.deleteOne({ _id: id })
    if (!deletedDocument.deletedCount) {
      const message = `Resource with id ${id} does not exists`
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return deletedDocument
  }
}

export default MongoDAO
