import { err, ok, Result } from 'neverthrow';
import { Guard } from '../../../common/guard';
import { ValueObject } from '../../../common/value_object';

interface ListLabelProps {
    value: string;
  }

export class ListLabel extends ValueObject<ListLabelProps> {
    public static minLength: number = 2;

    public static maxLength: number = 25;

    get value(): string {
        return this.props.value;
    }

    private constructor(props: ListLabelProps) {
        super(props);
    }

    public static create(props: ListLabelProps): Result<ListLabel, string> {
        const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'listlabel');

        if (!nullGuardResult.succeeded) {
            return err(nullGuardResult.message!);
        }

        const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
        const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

        if (!minGuardResult.succeeded) {
            return err(minGuardResult.message!);
        }

        if (!maxGuardResult.succeeded) {
            return err(maxGuardResult.message!);
        }

        return ok(new ListLabel(props));
    }
}
