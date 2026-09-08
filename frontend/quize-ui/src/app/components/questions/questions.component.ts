import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { CreateQuestionRequest, Question } from '../../models/question.model';
import { API_ENDPOINTS } from '../../constants/api-endspoints';
import { Option, CreateOptionRequest } from '../../models/option.model';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent implements OnInit {

  private api = inject(ApiServiceService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  quizId!: number;

  questions: Question[] = [];

  questionForm!: FormGroup;

  loading = false;
  errorMessage = '';
  submitting = false;
  showForm = false;

  // Add options related properties
  optionForm!: FormGroup;

  selectedQuestionId!: number;

  showOptionForm = false;

  optionSubmitting = false;

  constructor() {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.optionForm = this.fb.group({
      option: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      is_correct: [false]
    });
  }

  ngOnInit(): void {
    this.quizId = Number(this.route.snapshot.paramMap.get('quizId'));
    console.log('Quiz ID:', this.quizId);
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.loading = true;
    this.errorMessage = '';

    const endpoint = `${API_ENDPOINTS.questions}?quiz=${this.quizId}`;

    console.log('Loading questions from endpoint:', endpoint);

    this.api.getData<Question[]>(endpoint).subscribe({
      next: (questions) => {
        this.questions = questions;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading questions:', error);
        this.errorMessage = 'Failed to load questions.';
        this.loading = false;
      }
    });
  }

  openAddQuestion(): void {
    this.showForm = true;
    this.questionForm.reset();
  }

  closeAddQuestion(): void {
    this.showForm = false;
    this.questionForm.reset();
  }

  submitQuestion(): void {
    if (this.questionForm.invalid) {
      this.questionForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const questionData: CreateQuestionRequest = {
      quiz: this.quizId,
      question: this.questionForm.value.question,
    };
    console.log('Submitting question:', questionData);

    this.api.postData<Question>(API_ENDPOINTS.questions, questionData).subscribe({
      next: (createdQuestion) => {
        // this.questions.push(createdQuestion);
        this.questions = [...this.questions, createdQuestion]; // Update the questions list with the new question
        this.submitting = false;
        this.closeAddQuestion();
      },
      error: (error) => {
        console.error('Error submitting question:', error);
        this.errorMessage = 'Failed to submit question.';
        this.submitting = false;
      }
    });
  }

  get question() {
    return this.questionForm.get('question');
  }

  openAddOption(questionId: number): void {

    this.selectedQuestionId = questionId;

    this.showOptionForm = true;

    this.optionForm.reset({
      option: '',
      is_correct: false
    });

  }

  closeOption(): void {
    this.showOptionForm = false;
    this.optionForm.reset({
      option: '',
      is_correct: false
    });
  }

  submitOption(): void {
    if (this.optionForm.invalid) {
      this.optionForm.markAllAsTouched();
      return;
    }
    this.optionSubmitting = true;

    const optionData: CreateOptionRequest = {
      question: this.selectedQuestionId,
      option: this.optionForm.value.option,
      is_correct: this.optionForm.value.is_correct
    };

    console.log('Submitting option:', optionData);

    this.api.postData<Option>(API_ENDPOINTS.options, optionData).subscribe({
      next: (createdOption) => {
        // Handle successful option submission
        this.optionSubmitting = false;
        this.closeOption();

        this.loadQuestions();
      },
      error: (error) => {
        console.error('Error submitting option:', error);
        this.optionSubmitting = false;
        this.errorMessage = 'Failed to submit option.';
      }
    });
  }
}
