import { Component, inject, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { API_ENDPOINTS } from '../../constants/api-endspoints';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, CreateCategoryRequest } from '../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];

  loading = false;
  errorMessage = '';

  showForm = false;
  submitting = false;

  categoryForm!: FormGroup;
  router = inject(Router);

  constructor(private api: ApiServiceService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.api.getData<Category[]>(API_ENDPOINTS.categories).subscribe({
      next: (data) => {
        this.categories = data
        console.log('Categories:', data);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  openAddCategory(): void {
    this.showForm = true;
    this.categoryForm.reset();
  }

  closeAddCategory(): void {
    this.showForm = false;
    this.categoryForm.reset();
  }

  submitCategory(): void {
    if (this.categoryForm.invalid) {
      return;
    }
    this.submitting = true;

    const categoryData : CreateCategoryRequest = {
      name: this.categoryForm.value.name,
    };

    this.api.postData<Category>(API_ENDPOINTS.categories, categoryData).subscribe({
      next: (response) => {
        console.log('Category added:', response);  
        this.submitting = false;
        this.categories = [...this.categories, response]; // Update the categories list with the new category
        this.closeAddCategory();
      },
      error: (error) => {
        console.error('Error adding category:', error);
        this.submitting = false;
        this.errorMessage = 'Failed to add category. Please try again.';
      }
    });
  }

  get name() {
    return this.categoryForm.get('name');
  }

  startQuiz(categoryId: number): void {
    this.router.navigate(['/quizzes/category', categoryId]);
  }
}









// import { Component, OnInit } from '@angular/core';

// import { Category } from '../../models/category.model';
// import { ApiServiceService } from '../../services/api-service.service';
// import { API_ENDPOINTS } from '../../constants/api-endspoints';

// @Component({
//   selector: 'app-category-list',
//   standalone: true,
//   templateUrl: './category-list.component.html',
//   styleUrl: './category-list.component.css'
// })
// export class CategoryComponent implements OnInit {

//   // categories : Category[] = [];
//   categories: any;

//   loading = false;
//   errorMessage = '';

//   constructor(
//     private apiService: ApiServiceService
//   ) {}

//   ngOnInit(): void {
//     this.loadCategories();
//   }

//   loadCategories(): void {

//     this.loading = true;
//     this.errorMessage = '';

//     this.apiService.getData(API_ENDPOINTS.categories).subscribe({

//       next: (response) => {
//         this.categories = response;
//         this.loading = false;
//       },

//       error: (error) => {
//         console.error('Category API error:', error);

//         this.errorMessage =
//           'Unable to load categories. Please try again.';

//         this.loading = false;
//       }

//     });
//   }
// }