import { Question } from './question.model';

export interface CreateQuizRequest  {
//   id: number;
  title: string;
  Category: number; 
}

export interface Quiz {
  id: number;
  title: string;
  Category: number; 
  questions: Question[];
}