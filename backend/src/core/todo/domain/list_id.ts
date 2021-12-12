import { ValueObject } from '../../common/domain/value_object';
import { Guard } from '../../common/validation/guard';
import { InvalidArgument } from './errors/invalid_argument';

interface ListIdProps {
    value: string;
}

export class ListId extends ValueObject<ListIdProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: ListIdProps) {
        super(props);
    }

    public static create(props: ListIdProps): ListId {
        const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'listId');

        if (!nullGuardResult.succeeded) {
            throw new InvalidArgument(nullGuardResult.message!);
        }

        return new ListId(props);
    }
}
