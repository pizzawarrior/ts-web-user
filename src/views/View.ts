import { Model } from "../models/Model";
import { HasId } from "../models/HasId";

export abstract class View<T extends Model<K>, K extends HasId>{
    regions: { [key: string]: Element } = {};

    constructor(
        public parent: Element,
        public model: T
    ) {
        this.bindEventToModel();
    }

    abstract template(): string;

    eventsMap(): { [key: string]: () => void; } {
        return {}
    }

    regionsMap(): { [key: string]: string } {
        return {};
    }

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

    mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();

        for (let key in regionsMap) {
            const selector = regionsMap[key];
            const element = fragment.querySelector(selector);
            if (element) {
                this.regions[key] = element;
            }
        }
    }

    onRender(): void {}

    render(): void {
        // this clears the contents of the parent element in the DOM each time a re-render occurs, preventing stacking of html templates on the page
        this.parent.innerHTML = '';

        // we need to turn the string literal from the template() method into an actual html element
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);

        this.onRender();

        this.parent.append(templateElement.content);
    };
}
