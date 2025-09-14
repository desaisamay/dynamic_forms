import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { CommonModule } from '@angular/common';


@NgModule({
declarations: [],
imports: [CommonModule,
    ReactiveFormsModule, BrowserModule, ReactiveFormsModule, DynamicFormComponent, AppComponent],
providers: [],
bootstrap: [],
exports: [DynamicFormComponent]
})
export class AppModule { }