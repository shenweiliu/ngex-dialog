import { Routes } from '@angular/router';
import { SampleMainComponent } from './sample-main.component';
import { SampleSecondComponent } from './sample-second.component';

export const routes: Routes = [
    { path: "", redirectTo: "main", pathMatch: "full" },    
    { path: 'main', component: SampleMainComponent },
    { path: 'second', component: SampleSecondComponent }
];