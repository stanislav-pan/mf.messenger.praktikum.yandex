export interface SubmitEvent extends Event {
    submitter: HTMLElement;
}

declare global {
    interface ObjectConstructor {
        fromEntries(xs: IterableIterator<[string, string]>): object;
    }
}
