import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  calculatorForm!: FormGroup;
  result: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.calculatorForm = this.fb.group({
      input1: [0, Validators.required],
      operator1: ['+', Validators.required],
      input2: [0, Validators.required],
      operator2: ['+', Validators.required],
      input3: [0, Validators.required],
    });
  }

  calculate(): void {
    const input1 = this.calculatorForm.value.input1;
    const input2 = this.calculatorForm.value.input2;
    const input3 = this.calculatorForm.value.input3;
    const operator1 = this.calculatorForm.value.operator1;
    const operator2 = this.calculatorForm.value.operator2;

    let intermediateResult: number;

    if (operator2 === '*' || operator2 === '/') {
      intermediateResult = this.performOperation(input2, input3, operator2);
      intermediateResult = this.performOperation(input1, intermediateResult, operator1);
    } else {
      intermediateResult = this.performOperation(input1, input2, operator1);
      intermediateResult = this.performOperation(intermediateResult, input3, operator2);
    }

    this.result = intermediateResult;
  }

  performOperation(a: number, b: number, operator: string): number {
    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return 0;
    }
  }
}
