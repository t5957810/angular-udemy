import { Subscription } from 'rxjs';
import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private user$: Subscription;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user$ = this.authService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  onSave() {
    this.dataStorageService.storeRecipes();
  }

  onFetch() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
