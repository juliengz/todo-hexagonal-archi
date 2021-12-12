import { ValueObject } from '../../common/domain/value_object';
import { Guard } from '../../common/validation/guard';
import { InvalidArgument } from '../../todo/domain/errors/invalid_argument';

interface UserLoginProps {
    value: string;
  }

export class UserLogin extends ValueObject<UserLoginProps> {
    public static minLength: number = 2;

    public static maxLength: number = 20;

    get value(): string {
        return this.props.value;
    }

    private constructor(props: UserLoginProps) {
        super(props);
    }

    public static create(props: UserLoginProps): UserLogin {
        const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'userlogin');

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

        return new UserLogin(props);
    }
}
