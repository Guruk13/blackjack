import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { TableComponent } from './table/table.component';
import{HomeComponent} from './home/home.component'


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blackprack', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }