import { Component, inject, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { Quiz } from '../../models/quiz.model';
import { API_ENDPOINTS } from '../../constants/api-endspoints';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quizzes',
  standalone: true,
  imports: [],
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
  // router = inject(Router);

  constructor() { }

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
}
