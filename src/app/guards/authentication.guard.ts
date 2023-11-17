import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppStateService } from '../services/app-state.service';
import { AuthRepositoryService } from '../services/auth.repository.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard {
  constructor(
    private appState: AppStateService,
    private router: Router,
    private authService: AuthRepositoryService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.appState.authState.isAuthenticated) {
      return true;
    } else {
      if (localStorage.getItem('token')) {
        //we need to verify first the token by sending a request to the backend
        this.authService.decodeToken(localStorage.getItem('token')!);
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    }
  }
}
