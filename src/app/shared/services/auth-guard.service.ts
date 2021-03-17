import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild{
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // return this.authService.isLoggedIn
    //   .then(
    //     (authenticated : boolean) => {
    //       if(authenticated) {
    //         return true
    //       } else {
    //         this.router.navigate(['/'])
    //       }
    //     }
    //   )

    if(this.authService.isLoggedIn) {
      return true
    } else {
      this.router.navigate(['login'])
    }
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state)
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
}
