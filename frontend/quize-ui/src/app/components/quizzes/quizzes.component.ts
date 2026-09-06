import { Component, inject, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { CreateQuizRequest, Quiz } from '../../models/quiz.model';
import { API_ENDPOINTS } from '../../constants/api-endspoints';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quizzes.component.html',
  styleUrl: './quizzes.component.css'
})
export class QuizzesComponent implements OnInit {

  api = inject(ApiServiceService);
  quizzes: any[] = [];

  categoryId!: number;
  loading = false;
  errorMessage = '';

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  showForm = false;
  submitting = false;

  quizForm!: FormGroup;
  private fb = inject(FormBuilder);

  constructor() {
    this.quizForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      // category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryId = Number(this.activatedRoute.snapshot.paramMap.get('categoryId'));
    console.log('Category ID:', this.categoryId);

    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.loading = true;
    this.errorMessage = '';

    const endpoint = `${API_ENDPOINTS.quizzes}?category=${this.categoryId}`;

    this.api.getData<Quiz[]>(endpoint).subscribe({
      next: (response) => {
        this.quizzes = response;
        console.log('Quizzes loaded:', this.quizzes);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching quizzes:', error);

        this.errorMessage =
          'Unable to load quizzes. Please try again.';

        this.loading = false;
      }
    });
  }

  startQuiz(quizId: number): void {
    this.router.navigate(['/quiz', quizId]);
  }

  // createQuiz(): void {
  //   this.router.navigate(['/quiz/create']);
  // }


  openAddQuiz(): void {
    this.showForm = true;
    this.quizForm.reset();
  }

  closeAddQuiz(): void {
    this.showForm = false;
    this.quizForm.reset();
  }

  createQuiz(): void {
    if (this.quizForm.invalid) {
      return;
    }
    this.submitting = true;

    const quizData: CreateQuizRequest = {
      title: this.quizForm.value.title,
      // Category: Number(this.quizForm.value.category),
      Category: Number(this.categoryId), // Use the categoryId from the route parameter
    };

    this.api.postData<Quiz>(API_ENDPOINTS.quizzes, quizData).subscribe({
      next: (response) => {
        console.log('Category added:', response);
        this.submitting = false;
        this.quizzes = [...this.quizzes, response]; // Update the quizzes list with the new quiz
        this.closeAddQuiz();
      },
      error: (error) => {
        console.error('Error adding category:', error);
        this.submitting = false;
        this.errorMessage = 'Failed to add category. Please try again.';
      }
    });
  }

  get title() {
    return this.quizForm.get('title');
  }

  manageQuestions(quizId: number): void {

    this.router.navigate([
      '/questions/quiz',
      quizId
    ]);

  }
}
