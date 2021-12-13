import { Identifier } from '../../common/domain/indentifier';
import { Guard } from '../../common/validation/guard';
import { InvalidArgument } from './errors/invalid_argument';

export class OwnerId extends Identifier<string> {
    public static create(id?: string): OwnerId {
        const nullGuardResult = Guard.againstNullOrUndefined(id, 'ownerId');

        if (!nullGuardResult.succeeded) {
            throw new InvalidArgument(nullGuardResult.message!);
        }

        return new OwnerId(id!);
    }
}
