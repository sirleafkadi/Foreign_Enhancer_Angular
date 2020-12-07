import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import{AuthguardService} from './authguard.service';
import{HttpInterceptorService} from './http-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { SectionOneComponent } from './section-one/section-one.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    SectionOneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
      
     }
   })
  ],
  providers: [AuthguardService, {provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
