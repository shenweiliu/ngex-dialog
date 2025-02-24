//import { Component, OnDestroy } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { DialogMainComponent } from './dialog-main.component';
import { DialogService } from './dialog.service';

//@Component({
//    selector: 'dialog-component'
//})
export abstract class DialogComponent {

    private observer!: Observer<any>;
    result!: any;
    dialogMain!: DialogMainComponent;    
    dialogCallback!: any;

    //For passing caller request data items to current dialog component.
    callerData!: any;

    //Set position based on cursor point if used.
    initElement: any = undefined;
    h_Offset: number = 0;
    v_Offset: number = 0;
    //Alternatives for IE 11 which not support scrollX and scrollY.
    h_event: number = 0; 
    v_event: number = 0;
    //End of Set position.

    //Declared for any component-level custom setting used by TypeScript.
    //Component-level values will be passed from original callers.
    width!: string;    
    grayBackground!: boolean;
    animation!: boolean;
    draggable!: boolean;
     
    topOffset!: number;
    closeDelay!: number;
    closeDelayParent!: number;
    closeByClickOutside!: boolean;
    closeByEnter!: boolean;
    closeByEscape!: boolean;
    closeAllDialogs!: boolean;
    closeImmediateParent!: boolean;
    keepOpenForAction!: boolean;
    keepOpenForClose!: boolean;
    beforeActionCallback: any = undefined;
    beforeCloseCallback: any = undefined;

    //For basic type dialogs only.
    subType!: string;
    title!: string;
    showIcon!: boolean;
    icon!: string;
    actionButtonLabel!: string;
    closeButtonLabel!: string;
    dialogAddClass!: string;
    headerAddClass!: string;
    titleAddClass!: string;
    bodyAddClass!: string;
    messageAddClass!: string;
    footerAddClass!: string;
    actionButtonAddClass!: string;
    closeButtonAddClass!: string;

    //Basic dialog type flag (internal use). 
    //Value is set in ExDialog service and used in BasicDialogComponent and DialogMainComponent.
    basicType: string = '';

    constructor(protected dialogService: DialogService) { }

    //Set input parameters to component properties.
    fillData(data: any = {}): Observable<object> {         
        let pThis: Record<string, any> = this;
        let keys: string[] = Object.keys(data);
        for (let idx: number = 0, length: number = keys.length; idx < length; idx++) {
            let key: string = keys[idx];
            pThis[key] = data[key];
        }
        return  new Observable((observer: any) => {
            this.observer = observer;
            return () => {
                this.dialogResult();
            }
        });
    }

    //Conditionally close or keep opened dialog and return observer result.
    dialogResult(): void {
        
        //Callback function for cases when this.result has value.        
        let callBackResult!: any;
        if (this.result !== undefined) {
            if (this.result == false && this.beforeCloseCallback && typeof this.beforeCloseCallback === 'function') {
                callBackResult = this.beforeCloseCallback.call(this);
            }
            else if (this.result == true && this.beforeActionCallback && typeof this.beforeActionCallback === 'function') {
                callBackResult = this.beforeActionCallback.call(this);
            }
            else {
                this.closeDialog();
                return;
            }

            //Callback function can either returning boolean value or observable object.
            if (callBackResult !== undefined && callBackResult == true) {
                this.closeDialog();
            }
            else if (callBackResult && typeof callBackResult === 'object') {
                callBackResult.subscribe((result: any) => {
                    if (result) {
                        this.closeDialog();
                    }
                });
            }
        }
        else {
            //Just close dialog.
            this.closeDialog();
        }
    }
    
    closeDialog():void {      
        if (this.observer) {
            this.observer.next(this.result);
        }
        if ((this.result == true && !this.keepOpenForAction ) ||
            (this.result == false && !this.keepOpenForClose) ||
            this.result == undefined) {
            this.dialogService.removeDialog(this);
        }
    }  
}
