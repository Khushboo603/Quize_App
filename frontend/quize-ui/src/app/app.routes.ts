import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'categories',
        loadComponent: () => 
            import(
                './components/category/category.component'
            ).then(m => m.CategoryComponent)
    },
    {
        path: 'quizzes/category/:categoryId',
        loadComponent: () => 
            import(
                './components/quizzes/quizzes.component'
            ).then(m => m.QuizzesComponent)
    },
    {
        path: 'questions/quiz/:quizId',
        loadComponent: () => 
            import(
                './components/questions/questions.component'
            ).then(m => m.QuestionsComponent)
    },
    {
        path: 'quiz/create',
        loadComponent: () => 
            import(
                './components/quize-form/quize-form.component'
            ).then(m => m.QuizeFormComponent)
    },
    {
        path: 'quiz/:quizId',
        loadComponent: () => 
            import(
                './components/take-quize/take-quize.component'
            ).then(m => m.TakeQuizeComponent)
    },
    {
        path: '',
        redirectTo: 'categories',
        pathMatch: 'full'
    },
];
