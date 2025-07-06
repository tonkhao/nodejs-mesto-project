import REQUEST_STATUS from '../types/statusCodes';

export default class NotFoundError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = REQUEST_STATUS.NOT_FOUND;
  }
}
