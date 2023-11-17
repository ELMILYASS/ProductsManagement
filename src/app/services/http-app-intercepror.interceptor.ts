import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AppStateService } from './app-state.service';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpAppInterceptor implements HttpInterceptor {
  constructor(
    private appStateService: AppStateService,
    private loadService: LoaderService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // before each request to the backend
    this.loadService.showLoading();
    let token = '';

    token = this.appStateService.authState.token;
    const modifiedReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ` + token),
    });
    // this.appStateService.setProductState({ state: 'LOADING' });
    return next.handle(modifiedReq).pipe(
      finalize(() => {
        this.loadService.hideLoading();
        // this.appStateService.setProductState({ state: 'LOADED' });
      })
    );
  }
}
