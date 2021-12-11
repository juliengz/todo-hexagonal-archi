import { Entity } from '../../common/domain/entity';
import { List } from './list';

export interface ListUserPropsInterface {
    lists: List[]
}

export class Owner extends Entity<ListUserPropsInterface> {
    private constructor(props: ListUserPropsInterface, id: string) {
        super(props, id);
    }

    static create(props: ListUserPropsInterface, id: string): Owner {
        const defaultListProps: ListUserPropsInterface = {
            ...props,
            lists: [],
        };

        return new Owner(defaultListProps, id);
    }
}
