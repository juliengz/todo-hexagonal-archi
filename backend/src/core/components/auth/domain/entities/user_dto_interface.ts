import { Uuid } from '../../../../ports/persistence/id_generator';

export interface UserDtoInterface {
    id: Uuid
    login:string;
}
