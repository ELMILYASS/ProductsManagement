import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  public productsState: any = {
    products: [],
    keyword: '',
    currentPage: 1,
    pageSize: 4, // on doit choisir le nombre d'éléments par page et automatiquement json-server s'en s'occupe
    totalPages: 0,
    status: '',
    totalCount: 0,
    errorMessage: '',
  };
  public authState: any = {
    isAuthenticated: false,
    username: '',
    roles: [],
    token: '',
    status: '',
    errorMessage: '',
  };
  constructor() {}

  public setProductState(state: any) {
    this.productsState = { ...this.productsState, ...state };
  }
  public setAuthState(state: any) {
    this.authState = { errorMessage: '', ...this.authState, ...state };
  }
}
