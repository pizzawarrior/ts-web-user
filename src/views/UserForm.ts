import { User } from "../models/User";

export class UserForm {
    constructor(
        public parent: Element,
        public model: User,
    ) {
        this.bindEventToModel();
    };

    // helper method to re-render data in the browser when a change-event is detected
    bindEventToModel(): void {
        this.model.on('change', () => {
            this.render();
        })
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetRandomAgeClick,
            'click:.set-name': this.onSetNameClick
        };
    }

    onSetRandomAgeClick = (): void => {
        this.model.setRandomAge();
    }

    onSetNameClick = (): void => {
        const input = this.parent.querySelector('input')
        const name = input?.value
        this.model.setProperty({ name })
    }

    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <div>User ID: ${this.model.getProperty('id')}</div>
                <div>User Name: ${this.model.getProperty('name')}</div>
                <div>User Age: ${this.model.getProperty('age')}</div>
                <input>
                <button class="set-name">Update Name</button>
                <button class="set-age">Set Random Age</button>
            </div>
        `
    };

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');
            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey])
            });
        }
    }

    render(): void {
        // this clears the contents of the parent element in the DOM each time a re-render occurs, preventing stacking of all html elements on the page
        this.parent.innerHTML = '';

        // we need to turn the string literal from the template() method into an actual html element
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    };
}
