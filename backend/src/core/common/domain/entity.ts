import { Identifier } from './indentifier';

// eslint-disable-next-line no-use-before-define
const isEntity = (v: any): v is Entity<any> => v instanceof Entity;

export abstract class Entity<T> {
  protected readonly id: Identifier<string>;

  public readonly props: T;

  constructor(props: T, id: string) {
      this.id = new Identifier(id);
      this.props = props;
  }

  public equals(object?: Entity<T>) : boolean {
      if (object == null || object === undefined) {
          return false;
      }

      if (this === object) {
          return true;
      }

      if (!isEntity(object)) {
          return false;
      }

      return this.id.equals(object.id);
  }
}
