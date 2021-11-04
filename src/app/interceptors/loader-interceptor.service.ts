import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {LoadingService} from "../services/loading.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService {

  private requests: HttpRequest<any>[] = [];
  constructor(private loaderService: LoadingService, private router: Router) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading$.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.requests.push(req);

    this.loaderService.isLoading$.next(true);
    return Observable.create((observer:any) => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.removeRequest(req);
              observer.next(event);
            }
          },
          err => {
            this.router.navigate(['/error'])
            this.removeRequest(req);
            observer.error(err);
          },
          () => {
            this.removeRequest(req);
            observer.complete();
          });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
