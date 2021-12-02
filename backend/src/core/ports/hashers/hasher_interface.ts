/* eslint-disable no-unused-vars */
export interface HasherInterface {
    hash(plainValue: string): string
    compare(plainValue: string, hash: string): Promise<boolean>
  }
