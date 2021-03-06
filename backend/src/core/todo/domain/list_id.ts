import { Identifier } from '../../common/domain/indentifier';
import { Guard } from '../../common/validation/guard';
import { InvalidArgument } from './errors/invalid_argument';

export class ListId extends Identifier<string> {
    public static create(id?: string): ListId {
        const nullGuardResult = Guard.againstNullOrUndefined(id, 'listId');

        if (!nullGuardResult.succeeded) {
            throw new InvalidArgument(nullGuardResult.message!);
        }

        return new ListId(id!);
    }
}
