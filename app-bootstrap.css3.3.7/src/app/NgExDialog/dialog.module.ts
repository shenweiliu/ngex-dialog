import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { DialogHostComponent } from "./dialog-host.component";
import { DialogMainComponent } from "./dialog-main.component";
import { DialogService } from "./dialog.service";
import { ExDialog } from "./ex-dialog.service";
import { DraggableDirective } from './draggable.directive';
import { AlignmentDirective } from './alignment.directive';
import { FocusBlurDirective } from './focus-blur.directive';
import { DialogIconDirective } from './dialog-icon.directive';
import { BasicDialogComponent } from './basic-dialog.component';
import { DialogCache } from "./dialog-cache";
import { NgExDialogConfig } from "./dialog-config";

export { DialogComponent } from './dialog.component';
export { DialogService } from './dialog.service';
export { ExDialog } from "./ex-dialog.service";
export { FocusBlurDirective } from "./focus-blur.directive";
export { DialogCache } from "./dialog-cache";

@NgModule({
	schemas: [
      NO_ERRORS_SCHEMA //Add for inline component tag which may render "not reg with module" error.
    ],
    declarations: [
        DialogHostComponent,
        DialogMainComponent,
        DraggableDirective,
        AlignmentDirective,
        FocusBlurDirective,
        DialogIconDirective,
        BasicDialogComponent
    ],
    providers: [
        DialogService,
        ExDialog,
        NgExDialogConfig
    ],
    imports: [
        CommonModule
    ],
    exports: [        
        BasicDialogComponent,
        FocusBlurDirective
    ],
    entryComponents: [
        DialogHostComponent,
        DialogMainComponent,
        //SW: also need to declare these items as entryComponent.
        BasicDialogComponent
    ]
})
export class DialogModule {    
}
