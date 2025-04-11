import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalCustomers: number = 0;
  recentCustomers: any[] = [];
  loading: boolean = true;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.totalCustomers = customers.length;
        this.recentCustomers = customers.slice(-5).reverse(); // Get last 5 customers
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.loading = false;
      }
    });
  }

  navigateToCustomers(): void {
    this.router.navigate(['/customers']);
  }

  navigateToNewCustomer(): void {
    this.router.navigate(['/customers'], { queryParams: { action: 'new' } });
  }
} 