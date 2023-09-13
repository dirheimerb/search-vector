/**
 * @name Application error
 * @description Base class for application errors
 *
 */
export class ApplicationError extends Error {
  constructor(
    message: string,
    public data: Record<string, any> = {},
  ) {
    super(message);
  }
}

/**
 * @name User error
 * @description Base class for user errors
 */
export class UserError extends ApplicationError {}
