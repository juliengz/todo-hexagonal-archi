/* eslint-disable no-console */

import { Owner } from '../../../core/todo/domain/owner';
import {
    OwnerRepositoryInterface,
} from '../../../core/todo/repositories/owner_repository_interface';

export class OwnerRepository implements OwnerRepositoryInterface {
    private owners: Owner[];

    constructor() {
        this.owners = [];
    }

    async persist(owner: Owner): Promise<void> {
        this.owners.push(owner);

        return Promise.resolve();
    }

    async findAll(): Promise<Owner[]> {
        return Promise.resolve(this.owners);
    }

    async findById(id: string): Promise<Owner | null> {
        const foundOwner = this.owners.find((owner) => owner.id === id);

        return foundOwner || null;
    }

    async exists(owner: Owner): Promise<boolean> {
        return (await this.findById(owner.id)) != null;
    }

    import(owners: Owner[]): void {
        this.owners = owners;
    }
}
