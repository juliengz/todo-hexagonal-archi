import { Validator } from '../../../common/validation/validator';
import { ValidatorInterface } from '../../../common/validation/validator_interface';
import { CreateListCommandInterface } from '../commands/create_list_command_interface';

export class CreateListValidator extends Validator implements ValidatorInterface {
    validate(props: CreateListCommandInterface): void {
        if (props.label) {
            if (props.label.length === 0) this.addErrors('label', 'required');
            if (props.label.length > 25) this.addErrors('label', 'less_than_25');
        }
    }
}
