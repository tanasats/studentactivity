import { MsuuserModule } from './msuuser/msuuser.module';
import { authInterceptorProviders } from './interceptor/auth.interceptor';
//import { AuthInterceptor } from 'src/app/interceptor/auth.interceptor';
import { ErrorInterceptor } from 'src/app/interceptor/error.interceptor';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//import { CoreModule } from './core/core.module';  remove
import { ThemeModule } from './theme/theme.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GuestModule } from './guest/guest.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { SharedModule } from './shared/SharedModule';

//import { TestComponent } from './shared/components/test/test.component';
//import { Test123Component } from './shared/components/test123/test123.component';
//import { WordcountPipe } from './shared/pipes/wordcount.pipe';
//import { NavbarComponent } from './theme/layout/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    //WordcountPipe,
    //NavbarComponent,
    //TestComponent,
    //Test123Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ThemeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule, // share coponent+pipe
//  FontAwesomeModule,
    ToastrModule.forRoot(),
    NgbModule, 
    GuestModule,
    AdminModule,
    StudentModule,
    MsuuserModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    authInterceptorProviders,
  ],
  exports: [
   // WordcountPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
