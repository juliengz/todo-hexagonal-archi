import { ValueObject } from '../../common/domain/value_object';
import { Guard } from '../../common/validation/guard';
import { InvalidArgument } from '../../todo/domain/errors/invalid_argument';

interface UserCryptedPasswordProps {
    value: string;
  }

export class UserCryptedPassword extends ValueObject<UserCryptedPasswordProps> {
    get value(): string {
        return this.props.value;
    }

    private constructor(props: UserCryptedPasswordProps) {
        super(props);
    }

    public static create(props: UserCryptedPasswordProps): UserCryptedPassword {
        const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'usercryptedpassword');

        if (!nullGuardResult.succeeded) {
            throw new InvalidArgument(nullGuardResult.message!);
        }

        return new UserCryptedPassword(props);
    }
}
