import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AuthGardService } from './services/auth-gard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'wishlist',
    component: WishListComponent,
    canActivate: [AuthGardService],
  },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
