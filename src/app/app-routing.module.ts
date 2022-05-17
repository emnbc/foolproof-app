import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './components/files/files.component';
import { TypesComponent } from './components/types/types.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path: '', redirectTo: 'files', pathMatch: 'full'},
  {path: 'files', component: FilesComponent},
  {path: 'users', component: UsersComponent},
  {path: 'types', component: TypesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
