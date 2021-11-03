import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterComponent } from './components/character/character.component';
import { GraphQLModule } from './graphql.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoaderInterceptorService} from "./interceptors/loader-interceptor.service";
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterComponent,
    SpinnerComponent,
    NavbarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GraphQLModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the app is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
