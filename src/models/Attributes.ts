export class Attributes<T extends object> {
    constructor(private data: T) {};

    // generic constraint: K can only ever be one of the keys of T, (which
    // in this case refers to the object of UserProps.) key can only be of type K.
    // we return the value of the corresponding key of T
    get<K extends keyof T>(key: K): T[K] {
        return this.data[key];
    }

    set(updateProperty: T): void {
        Object.assign(this.data, updateProperty);
    }
}
