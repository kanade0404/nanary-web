/**
 * Angular Module
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
/**
 * Routing
 */
import { AppRoutingModule } from './app-routing.module';
/**
 * ng-bootstrap
 */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/**
 * Angular Material Module
 */
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/**
 * Custom Component
 */
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './layouts/header/header.component';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';
/**
 * Custom Service
 */
import { GlobalService } from './core/services/global.service';
import { UserService } from './core/services/user.service';
import { AuthService } from './core/services/auth.service';
import { NotifyService } from './core/services/notify.service';
import { CommentService } from './core/services/comment.service';
import { QuestionService } from './core/services/question.service';
/**
 * Others
 */
import { environment } from '../environments/environment';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    PageNotFoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    NgbModule.forRoot()
  ],
  providers: [
    GlobalService,
    UserService,
    AuthService,
    NotifyService,
    CommentService,
    QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
