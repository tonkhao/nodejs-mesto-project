import REQUEST_STATUS from '../types/statusCodes';

export default class BadRequestError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = REQUEST_STATUS.BAD_REQUEST;
  }
}
