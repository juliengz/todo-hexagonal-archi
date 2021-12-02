/* eslint-disable no-unused-vars */

export interface RepositoryInterface<T> {
    persist(model: T): Promise<void>
    findAll(): Promise<T[]>
    findById(id: string): Promise<T | null>
    exists(model: T): Promise<boolean>
  }
