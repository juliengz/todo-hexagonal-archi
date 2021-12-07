/* eslint-disable no-unused-vars */

export interface CommandHandlerInterface<T, U> {
    execute(payload: T): U
  }
