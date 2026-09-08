import { Option } from './option.model';

export interface Question {
  id: number;
  quiz: number;
  question: string;
  options: Option[];
}

export interface CreateQuestionRequest {
  quiz: number;
  question: string;
}