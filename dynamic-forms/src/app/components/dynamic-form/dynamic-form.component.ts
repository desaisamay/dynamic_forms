import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormSchema } from '../../models/form-schema';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {
  @Input() schema!: FormSchema;
  @Output() submitForm = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const controls: any = {};
    this.schema.fields.forEach(field => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.validation?.pattern) {
        validators.push(Validators.pattern(field.validation.pattern));
      }
      controls[field.name] = [field.type === 'checkbox' ? false : '', validators];
    });
    this.form = this.fb.group(controls);
  }

  submitted = false;

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
      this.form.reset();
      this.submitted = false;
    } else {
      this.form.markAllAsTouched();
    }
  }
}
