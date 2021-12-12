import { ValueObject } from '../../common/domain/value_object';
import { Guard } from '../../common/validation/guard';
import { InvalidArgument } from './errors/invalid_argument';

interface OwnerIdProps {
    value: string;
}

export class OwnerId extends ValueObject<OwnerIdProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: OwnerIdProps) {
        super(props);
    }

    public static create(props: OwnerIdProps): OwnerId {
        const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'ownerId');

        if (!nullGuardResult.succeeded) {
            throw new InvalidArgument(nullGuardResult.message!);
        }

        return new OwnerId(props);
    }
}
