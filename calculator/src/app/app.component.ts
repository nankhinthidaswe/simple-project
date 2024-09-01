import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  calculatorForm!: FormGroup;
  result: number | null = null;
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.calculatorForm = this.fb.group({
      input1: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      operator1: ['+', Validators.required],
      input2: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      operator2: ['+', Validators.required],
      input3: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
    });
  }

  calculate(): void {
    if (this.calculatorForm.invalid) {
      this.errorMessage = 'Please fill in all the fields with valid numbers.';
      return;
    }

    this.errorMessage = ''; 

    const input1 = parseFloat(this.calculatorForm.value.input1);
    const input2 = parseFloat(this.calculatorForm.value.input2);
    const input3 = parseFloat(this.calculatorForm.value.input3);
    const operator1 = this.calculatorForm.value.operator1;
    const operator2 = this.calculatorForm.value.operator2;

    let firstResult: number;
    

    if ((operator1 === '*'||  operator1 === '/') && (operator2 === '*'||  operator2 === '/')) {
      firstResult = this.performOperation(input1, input2, operator1);
      this.result = this.performOperation(firstResult, input3, operator2);
    } else if ((operator1 === '*' ||  operator1 === '/') && (operator2 === '+' || operator2 === '-')) {
      firstResult = this.performOperation(input1, input2, operator1);
      this.result = this.performOperation(firstResult, input3, operator2);
    } else {
      firstResult = this.performOperation(input2, input3, operator2);
      this.result = this.performOperation(input1, firstResult, operator1);
    }
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

  reset(): void {
    this.calculatorForm.reset({
      input1: '',
      operator1: '+',
      input2: '',
      operator2: '+',
      input3: ''
    });
    this.result = null;
    this.errorMessage = '';
  }
}