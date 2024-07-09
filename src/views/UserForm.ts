import { View } from "./View";

export class UserForm extends View {

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
}
