import { MsuuserComponent } from './msuuser.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './page/profile/profile.component';

const routes: Routes = [
  {path:'',component:MsuuserComponent,pathMatch:'full'},
  {path:'profile',component:ProfileComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MsuuserRoutingModule { }
