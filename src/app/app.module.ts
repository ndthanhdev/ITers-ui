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

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule.forRoot(),
    Ng2PageScrollModule.forRoot(),
    StoreModule.provideStore(reducer, initialState),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(TopicServiceEffect),
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
