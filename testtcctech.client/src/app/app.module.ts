import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MasterdataBarcodeComponent } from './pages/masterdata-barcode/masterdata-barcode.component';

import { ProductCodeFormatDirective } from './shared/directives/product-code-format.directive';

@NgModule({
  declarations: [
    AppComponent,
    MasterdataBarcodeComponent,

    ProductCodeFormatDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
