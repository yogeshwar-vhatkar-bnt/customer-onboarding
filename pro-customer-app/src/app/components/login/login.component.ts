import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isOtpStep = false;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^([a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)|([0-9]{10})$')]],
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  ngOnInit(): void {
  }

  // Getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';

    if (!this.isOtpStep) {
      // First step: Validate only username
      if (this.f['username'].invalid) {
        this.loading = false;
        return;
      }
      this.requestOtp();
    } else {
      // Second step: Validate only OTP
      if (this.f['otp'].invalid) {
        this.loading = false;
        return;
      }
      this.verifyOtp();
    }
  }

  private requestOtp(): void {
    // TODO: Implement actual OTP request logic
    // For now, we'll simulate an API call
    setTimeout(() => {
      this.loading = false;
      this.isOtpStep = true;
      // You would typically make an API call here to request OTP
      console.log('OTP requested for:', this.f['username'].value);
    }, 1000);
  }

  private verifyOtp(): void {
    // TODO: Implement actual OTP verification logic
    // For now, we'll simulate an API call
    setTimeout(() => {
      this.loading = false;
      // Simulate successful login
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
    }, 1000);
  }

  // Reset form to username step
  resetForm(): void {
    this.isOtpStep = false;
    this.f['otp'].reset();
  }

  // Get error message for username field
  getUsernameErrorMessage(): string {
    if (this.f['username'].hasError('required')) {
      return 'Email or mobile number is required';
    }
    if (this.f['username'].hasError('pattern')) {
      return 'Please enter a valid email or 10-digit mobile number';
    }
    return '';
  }

  // Get error message for OTP field
  getOtpErrorMessage(): string {
    if (this.f['otp'].hasError('required')) {
      return 'OTP is required';
    }
    if (this.f['otp'].hasError('pattern')) {
      return 'OTP must be 6 digits';
    }
    return '';
  }
} 