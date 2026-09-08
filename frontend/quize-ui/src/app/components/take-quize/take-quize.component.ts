import { Component, inject, OnInit } from '@angular/core';
import { Quiz } from '../../models/quiz.model';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-take-quize',
  standalone: true,
  imports: [],
  templateUrl: './take-quize.component.html',
  styleUrl: './take-quize.component.css'
})
export class TakeQuizeComponent implements OnInit {

  quiz!: Quiz;

  quizId!: number;

  currentQuestionIndex: number = 0;

  selectedOptionId: number | null = null;

  loading = false;

  errorMessage = '';

  api = inject(ApiServiceService);
  
  constructor() { }

  ngOnInit(): void {
  }

}
