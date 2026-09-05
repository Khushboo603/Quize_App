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
        path: '',
        redirectTo: 'categories',
        pathMatch: 'full'
    },
];
