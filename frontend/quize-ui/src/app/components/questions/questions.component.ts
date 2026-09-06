import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../services/api-service.service';
import { CreateQuestionRequest, Question } from '../../models/question.model';
import { API_ENDPOINTS } from '../../constants/api-endspoints';

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
  
  constructor() { 
    this.questionForm = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(2)]],
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
}
