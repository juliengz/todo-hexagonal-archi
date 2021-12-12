import { Mapper } from '../../common/mapper/mapper';
import { List } from '../domain/list';

export class ListMap implements Mapper<List> {
    public static toPersistence(list: List): any {
        return {
            label: list.label.value,
            owner_id: list.ownerId.value,
            tasks: list.tasks,
        };
    }
}
