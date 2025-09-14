import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { DynamicFormComponent } from './dynamic-form.component';
import { FormSchema } from '../../models/form-schema';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  const mockSchema: FormSchema = {
    title: 'Test Form',
    fields: [
      { label: 'Full Name', name: 'fullName', type: 'text', required: true },
      {
        label: 'Email',
        name: 'email',
        type: 'text',
        required: true,
        validation: {
          pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$',
          message: 'Invalid email'
        }
      },
      { label: 'Subscribe', name: 'subscribe', type: 'checkbox' }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ // ✅ standalone components go here
        CommonModule,
        ReactiveFormsModule,
        DynamicFormComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.schema = mockSchema;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of fields', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toBe(3); // text + email (checkbox is another input[type=checkbox])
  });

  it('should mark required field invalid when empty', () => {
    const fullNameControl = component.form.get('fullName');
    fullNameControl?.setValue('');
    expect(fullNameControl?.invalid).toBeTrue();
  });

  it('should validate email pattern correctly', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('wrong-email');
    expect(emailControl?.invalid).toBeTrue();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should emit submit event with form values when valid', () => {
    spyOn(component.submitForm, 'emit');

    component.form.setValue({
      fullName: 'John Doe',
      email: 'john@example.com',
      subscribe: true
    });

    component.onSubmit();

    expect(component.submitForm.emit).toHaveBeenCalledWith({
      fullName: 'John Doe',
      email: 'john@example.com',
      subscribe: true
    });
  });

  it('should not emit submit event when form is invalid', () => {
    spyOn(component.submitForm, 'emit');

    component.form.setValue({
      fullName: '',
      email: 'bad',
      subscribe: false
    });

    component.onSubmit();

    expect(component.submitForm.emit).not.toHaveBeenCalled();
  });
});
