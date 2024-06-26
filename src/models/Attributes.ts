export class Attributes<T extends object> {
    constructor(private data: T) {};

    // Generic constraint: K can only ever be one of the keys of T,
    // (T in this case refers to the object of UserProps.) key can only be of type K.
    // We return the value of the corresponding key of T
    // The reason why this is an arrow fn (bound fn) is because there was a context issue with calling this method.
    // This will now always bind 'this' to the instance of Attributes that we create.
    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    }

    set = (updateProperty: T): void => {
        Object.assign(this.data, updateProperty);
    }
}
