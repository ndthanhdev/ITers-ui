import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {AuthModule} from "./auth/auth.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CoreModule} from "./core/core.module";
import {HomeModule} from "./home/home.module";
import {Ng2PageScrollModule} from "ng2-page-scroll";
import {StoreModule} from "@ngrx/store";
import {reducer, initialState} from "./shared/store/reducers/app.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {TopicServiceEffect} from "./shared/store/effects/topic.effect";
import {FroalaEditorModule, FroalaViewModule} from "angular2-froala-wysiwyg";
import {ThreadServiceEffect} from "./shared/store/effects/thread.effect";
import {UserModule} from "./user/user.module";
import {UserServiceEffect} from "./shared/store/effects/user.effect";
import {AuthServiceEffect} from "./shared/store/effects/auth.effect";
import {SimpleNotificationsModule} from "angular2-notifications";
import {AuthHttp, AuthConfig} from "angular2-jwt";
import {Http, RequestOptions} from "@angular/http";
import {PostServiceEffect} from "./shared/store/effects/post.effect";
import {DashboardModule} from "./dashboard/dashboard.module";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    StoreModule.provideStore(reducer, initialState),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(TopicServiceEffect),
    EffectsModule.run(ThreadServiceEffect),
    EffectsModule.run(PostServiceEffect),
    EffectsModule.run(UserServiceEffect),
    EffectsModule.run(AuthServiceEffect),
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    DashboardModule,
    UserModule,
    CoreModule,
  ],
  providers: [{
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
