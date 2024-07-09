import { User } from "../models/User";

export abstract class View{
    constructor(
        public parent: Element,
        public model: User
    ) {
        this.bindEventToModel();
    }

    abstract template(): string;
    abstract eventsMap(): { [key: string]: () => void; };

    // helper method to re-render data in the browser when a change-event is detected
    bindEventToModel(): void {
        this.model.on('change', () => {
            this.render();
        })
    }

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
        // this clears the contents of the parent element in the DOM each time a re-render occurs, preventing stacking of html templates on the page
        this.parent.innerHTML = '';

        // we need to turn the string literal from the template() method into an actual html element
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    };
}
