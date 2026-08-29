import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { API_ENDPOINTS } from '../../constants/api-endspoints';
import { CommonModule } from '@angular/common';

export interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  
  categories: any;
  constructor(private api: ApiServiceService) {}

  ngOnInit(): void {
    this.api.getData(API_ENDPOINTS.categories).subscribe({
      next: (data) => {
        this.categories = data
        console.log('Categories:', data);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
}
