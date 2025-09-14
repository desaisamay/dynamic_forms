import { Component } from '@angular/core';
import { FormSchema } from './models/form-schema';
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
import { CommonModule, JsonPipe } from '@angular/common';


@Component({
    selector: 'app-root',
    template: `
      <div style="padding:2rem">
        <app-dynamic-form [schema]="userSchema" (submitForm)="onSubmit($event)"></app-dynamic-form>
  
        <hr />
  
        <app-dynamic-form [schema]="rsvpSchema" (submitForm)="onSubmit($event)"></app-dynamic-form>
  
        <h3 *ngIf="lastOutput">Last submitted output (JSON):</h3>
        <pre *ngIf="lastOutput">{{ lastOutput | json }}</pre>
      </div>
    `,
    imports: [CommonModule, DynamicFormComponent, JsonPipe]
  })
export class AppComponent {
lastOutput: any = null;


userSchema: FormSchema = {
title: 'User Registration',
fields: [
{ label: 'Full Name', name: 'fullName', type: 'text', required: true },
{ label: 'Email', name: 'email', type: 'text', required: true, validation: { pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$', message: 'Invalid email address' } },
{ label: 'Date of Birth', name: 'dob', type: 'date' },
{ label: 'Gender', name: 'gender', type: 'dropdown', options: ['Male','Female','Other'], required: true },
{ label: 'Hobbies', name: 'hobbies', type: 'multiselect', options: ['Reading','Sports','Music','Travel'] },
{ label: 'Subscribe to newsletter', name: 'subscribe', type: 'checkbox' },
{ label: 'About Yourself', name: 'about', type: 'textarea' }
]
};


rsvpSchema: FormSchema = {
title: 'Event RSVP',
fields: [
{ label: 'Name', name: 'name', type: 'text', required: true },
{ label: 'Email', name: 'email', type: 'text', required: true, validation: { pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$' } },
{ label: 'Will Attend', name: 'willAttend', type: 'checkbox' },
{ label: 'Meal Preference', name: 'meal', type: 'dropdown', options: ['Veg','Non-Veg','Vegan'] }
]
};


onSubmit(value: any) {
console.log('Form submitted:', value);
this.lastOutput = value;
}
}