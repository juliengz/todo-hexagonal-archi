import { ValueObject } from '../../common/domain/value_object';
import { Guard } from '../../common/validation/guard';
import { InvalidArgument } from './errors/invalid_argument';

interface TaskDescriptionPropsInterface {
    value: string;
  }

export class TaskDescription extends ValueObject<TaskDescriptionPropsInterface> {
    public static minLength: number = 2;

    public static maxLength: number = 150;

    get value(): string {
        return this.props.value;
    }

    private constructor(props: TaskDescriptionPropsInterface) {
        super(props);
    }

    public static create(props:TaskDescriptionPropsInterface):TaskDescription {
        const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'taskdescription');

        if (!nullGuardResult.succeeded) {
            throw new InvalidArgument(nullGuardResult.message!);
        }

        const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);

        if (!minGuardResult.succeeded) {
            throw new InvalidArgument(minGuardResult.message!);
        }

        const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

        if (!maxGuardResult.succeeded) {
            throw new InvalidArgument(maxGuardResult.message!);
        }

        return new TaskDescription(props);
    }
}
