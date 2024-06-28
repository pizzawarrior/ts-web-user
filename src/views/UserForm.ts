export class UserForm {
    constructor(public parent: Element) {}

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:button': this.onButtonClick,
            'mouseenter:h1': this.onH1Hover
        }
    }

    onH1Hover(): void {
        console.log('y que carnal')
    }

    onButtonClick(): void {
        console.log('orale holmes')
    };

    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <input>
                <button>Enter</button>
            </div>
        `
    };

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');
            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey])
            })
        }

    }

    render(): void {
        // we need to turn the string literal from the template() method into an actual html element
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    };
}
