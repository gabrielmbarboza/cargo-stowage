import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedorComponent } from './component/fornecedor/fornecedor.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "home", component: HomeComponent }, 
    {path: "fornecedor", component: FornecedorComponent  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
