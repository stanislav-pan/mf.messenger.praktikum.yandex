export interface IListenerFn<T = unknown> {
  (next: T, errors?: unknown): void;
}
