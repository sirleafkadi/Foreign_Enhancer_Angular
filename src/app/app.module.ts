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
import { ProductComponent } from './product/product.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule, } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    SectionOneComponent,
    ProductComponent,
    LoaderComponent,
    FooterComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxImageZoomModule, // <-- Add this line
    JwtModule.forRoot({
      config: {
      
     }
   })
  ],
  providers: [AuthguardService, {provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
