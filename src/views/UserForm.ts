import { User, UserProps } from "../models/User";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetRandomAgeClick,
            'click:.set-name': this.onSetNameClick,
            'click:.save': this.onSaveClick
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

    onSaveClick = (): void => {
        this.model.save()
    }

    template(): string {
        return `
            <div>
                <input placeholder="${this.model.getProperty('name')}">
                <button class="set-name">Update Name</button>
                <br />
                <button class="set-age">Set Random Age</button>
                <br />
                <button class="save">Save</button>
            </div>
        `
    };
}
