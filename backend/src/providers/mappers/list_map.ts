import { Mapper } from '../../core/common/mapper/mapper';
import { List } from '../../core/todo/domain/list';

export class ListMap implements Mapper<List> {
    public static toPersistence(list: List): any {
        return {
            id: list.listId.toString(),
            label: list.label.value,
            owner_id: list.ownerId.value,
            tasks: list.tasks,
        };
    }
}
