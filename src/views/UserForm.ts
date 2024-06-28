export class UserForm {
    constructor(public parent: Element) {}

    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <input>
            </div>
        `
    };

    render(): void {
        // we need to turn the string literal from the template() method into an actual html element
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.parent.append(templateElement.content);
    };
}
