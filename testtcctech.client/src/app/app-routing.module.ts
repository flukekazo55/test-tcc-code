import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterdataBarcodeComponent } from './pages/masterdata-barcode/masterdata-barcode.component';

const routes: Routes = [
  { path: '', component: MasterdataBarcodeComponent },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
