export interface Option {
  id: number;
  question: number;
  option: string;
  is_correct: boolean;
}

export interface CreateOptionRequest {
  question: number;
  option: string;
  is_correct: boolean;
}