import { User } from '../../entities/user.entity';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User | null>;
  getByIds(ids: number[]): Promise<User[]>;
}

