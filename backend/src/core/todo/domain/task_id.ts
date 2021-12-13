import { Identifier } from '../../common/domain/indentifier';
import { Guard } from '../../common/validation/guard';
import { InvalidArgument } from './errors/invalid_argument';

export class TaskId extends Identifier<string> {
    public static create(id?: string): TaskId {
        const nullGuardResult = Guard.againstNullOrUndefined(id, 'taskId');

        if (!nullGuardResult.succeeded) {
            throw new InvalidArgument(nullGuardResult.message!);
        }

        return new TaskId(id!);
    }
}
