import { routes } from './routes';
import { provideRouter, RouterModule } from '@angular/router';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, RouterModule),
  ],
}).catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
