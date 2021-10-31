import { AlertComponent } from './../shared/component/alert/alert.component';
import { Router } from '@angular/router';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './model/auth-response-data';
import { PlaceholderDirective } from '../shared/directive/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error = null;
  closeSub$: Subscription;

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if(this.closeSub$) {
      this.closeSub$.unsubscribe();
    }
  }

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    this.error = null;

    let auth$ = new Observable<AuthResponseData>();

    if (this.isLoginMode) {
      auth$ = this.authService.signIn(email, password);
    } else {
      auth$ = this.authService.signUp(email, password);
    }

    auth$.subscribe((responseData: AuthResponseData) => {
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });

    form.reset();
  }

  private showErrorAlert(error: string) {
      const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
      const hostViewContainerRef = this.alertHost.viewContainerRef; //藉由directive取得viewContainerRef，可以和DOM互動的物件
      hostViewContainerRef.clear(); // 先清除之前可能建立的view 
      
      const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);    
      componentRef.instance.message = error;

      this.closeSub$ = componentRef.instance.close$.subscribe((data) => {
        this.closeSub$.unsubscribe();
        hostViewContainerRef.clear();
      });
  }

}
