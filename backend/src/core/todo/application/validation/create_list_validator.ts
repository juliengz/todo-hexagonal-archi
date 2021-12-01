import { Validator } from '../../../../shared/validation/validator';
import { ValidatorInterface } from '../../../../shared/validation/validator_interface';
import { ListCreationPropsInterface } from '../../domain/entities/list';

export class CreateListValidator extends Validator implements ValidatorInterface {
    validate(props: ListCreationPropsInterface): void {
        if (props.label) {
            if (props.label.length === 0) this.addErrors('label', 'required');
            if (props.label.length > 25) this.addErrors('label', 'less_than_25');
            if (props.label.length > 10) this.addErrors('label', 'less_than_10');
        }
    }
}
