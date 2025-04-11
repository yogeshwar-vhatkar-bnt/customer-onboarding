import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  customerForm: FormGroup;
  selectedCustomer: Customer | null = null;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (error) => console.error('Error fetching customers:', error)
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      if (this.isEditing && this.selectedCustomer?.id) {
        this.customerService.updateCustomer(this.selectedCustomer.id, this.customerForm.value)
          .subscribe({
            next: () => {
              this.loadCustomers();
              this.resetForm();
            },
            error: (error) => console.error('Error updating customer:', error)
          });
      } else {
        this.customerService.createCustomer(this.customerForm.value)
          .subscribe({
            next: () => {
              this.loadCustomers();
              this.resetForm();
            },
            error: (error) => console.error('Error creating customer:', error)
          });
      }
    }
  }

  editCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
    this.isEditing = true;
    this.customerForm.patchValue({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address
    });
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => this.loadCustomers(),
        error: (error) => console.error('Error deleting customer:', error)
      });
    }
  }

  resetForm(): void {
    this.customerForm.reset();
    this.selectedCustomer = null;
    this.isEditing = false;
  }
} 