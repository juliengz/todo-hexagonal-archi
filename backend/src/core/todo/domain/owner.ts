import { Entity } from '../../common/domain/entity';
import { Identifier } from '../../common/domain/indentifier';
import { List } from './list';
import { OwnerId } from './owner_id';

export interface ListUserPropsInterface {
    lists?: List[]
}

export class Owner extends Entity<ListUserPropsInterface> {
    private constructor(props: ListUserPropsInterface, id: Identifier<string>) {
        super(props, id);
    }

    get ownerId(): OwnerId {
        return OwnerId.create(this.id.toValue());
    }

    static create(props: ListUserPropsInterface, id: Identifier<string>): Owner {
        const defaultListProps: ListUserPropsInterface = {
            ...props,
            lists: [],
        };

        return new Owner(defaultListProps, id);
    }
}
