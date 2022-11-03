export const successResponse = data => {
  return {
    success: true,
    data
  }
}

export const errorResponse = (message) => {
  return {
    success: false,
    error: message
  }
}

export class HttpError {
  status: number
  message: string

  constructor(status, message) {
    this.status = status
    this.message = message
  }
}