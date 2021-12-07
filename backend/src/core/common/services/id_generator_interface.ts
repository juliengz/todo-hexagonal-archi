export type Uuid = string;

export interface IdGeneratorInterface {
    generateId(): Uuid;
  }
