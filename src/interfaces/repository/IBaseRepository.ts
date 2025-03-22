export interface IBaseRepository<T> {
    getAll() : Promise<T[]>;
    create(entity: Partial<T>): Promise<T>;
    getById(id: number): Promise<T | null>;
    deleteById(id: number): Promise<void>;
}