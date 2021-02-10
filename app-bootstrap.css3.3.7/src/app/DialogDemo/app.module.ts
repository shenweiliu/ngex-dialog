import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from '../NgExDialog/dialog.module';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { SideMenuComponent } from "./side-menu.component";
import { SampleMainComponent } from './sample-main.component';
import { SampleSecondComponent } from './sample-second.component';
import { ProductComponent } from './product.component';
import { TestDataService } from "./test-data.service";

@NgModule({
    declarations: [        
        AppComponent,
        SideMenuComponent,
        SampleMainComponent,
        SampleSecondComponent,
        ProductComponent        
    ],
    providers: [
        TestDataService, 
        ProductComponent
    ],    
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes),
        DialogModule        
    ],    
    entryComponents: [
        ProductComponent                
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
