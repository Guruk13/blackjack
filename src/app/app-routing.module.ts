import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import{HomeComponent} from './home/home.component'
import { TechniqueComponent } from './technique/technique.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blackprack', component: TableComponent },
  { path: 'technique', component: TechniqueComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }