export interface IListenerFn<T = any> {
    (next: T, errors?: any): void;
}
