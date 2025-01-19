import { Component, ViewChild, ComponentRef, ViewContainerRef, Type} from '@angular/core';
import { DialogComponent } from './dialog.component';
import { DialogMainComponent } from './dialog-main.component';
import { Observable } from 'rxjs';

@Component({
    selector: 'dialog-host',
    //imports: [DialogMainComponent],
    template: '<template #element></template>'    
})
export class DialogHostComponent {
    
    //Target element to insert dialogs.    
    @ViewChild('element', {static: true, read: ViewContainerRef}) private element!: ViewContainerRef;

    //Array to hold multiple dialogs.
    dialogs: Array<DialogComponent> = [];    

  constructor(private viewContainerRef: ViewContainerRef) {}

    /**
    * Adds dialog    
    * @return {Observable<any>}
    */
    addDialog(component:Type<DialogComponent>, data?:any, index?:number): Observable<any> {
        //let factory: any = this.resolver.resolveComponentFactory(DialogMainComponent);
        //let componentRef: any = this.element.createComponent(factory, index);      
        let componentRef: ComponentRef<DialogMainComponent> = this.element.createComponent(DialogMainComponent, {
            index: index
          });

        let dialogMain: DialogMainComponent = <DialogMainComponent>componentRef.instance;
        let _component: DialogComponent = dialogMain.addComponent(component);
        if (typeof (index) !== 'undefined') {
            this.dialogs.splice(index, 0, _component);
        }
        else {
            this.dialogs.push(_component);
        }

        setTimeout(() => {
            dialogMain.show();
        });
        return _component.fillData(data);
    }
    
    //Removes open dialog.    
    removeDialog(component: DialogComponent, closeDelay?: number) {        
        let pThis: any = this;
        let delayMs: number = (closeDelay && closeDelay != 0) ? closeDelay : component.closeDelay; 
        //No visible delay if no animaion fade in.
        if (!component.animation)
            delayMs = 5;        
        //For animation fade-out.
        component.dialogMain.hide();

        //Check and preform callback for dialogs without result value - mostly custom dialogs.
        if (component.result == undefined) {
            let callBackResult!: any;
            if (component.beforeCloseCallback && typeof component.beforeCloseCallback === 'function') {
                callBackResult = component.beforeCloseCallback.call(component);
            }
            else if (component.beforeActionCallback && typeof component.beforeActionCallback === 'function') {
                callBackResult = component.beforeActionCallback.call(component);
            }
            else {
                //Close dialog without callback.
                this.removeDialogNow(component, delayMs);
                return;
            }

            //Callback function return supports either boolean value or Observable object.
            if (callBackResult !== undefined && callBackResult == true) {
                this.removeDialogNow(component, delayMs);
            }
            else if (callBackResult && typeof callBackResult === 'object') {
                callBackResult.subscribe((result: any) => {
                    if (result) {
                        this.removeDialogNow(component, delayMs);
                    }
                });
            }
        }
        else {
            this.removeDialogNow(component, delayMs);
        }
    }

    removeDialogNow(component: DialogComponent, delayMs?: number) {
        let pThis: any = this;
        setTimeout(() => {
            let index = pThis.dialogs.indexOf(component);
            if (index > -1) {
                pThis.element.remove(index);
                pThis.dialogs.splice(index, 1);
            }
        }, delayMs);
    }

    //Remove open dialog and its immediate parent dialog.
    removeDialogAndParent(component: DialogComponent) {
        let pThis: any = this;
        let dialogIndex: number = this.dialogs.indexOf(component);
        this.dialogs.forEach(function (value: any, index: number) {
            if (index == dialogIndex || index == dialogIndex - 1) {                
                pThis.removeDialog(value, pThis.getCloseDelayForParent(value, index));
            }
        });
    } 

    //Removes all multiple opened dialogs.    
    removeAllDialogs() {        
        let pThis: any = this;
        this.dialogs.forEach(function (value: any, index: number) {            
            pThis.removeDialog(value, pThis.getCloseDelayForParent(value, index));
        });
    }

    //Get close delay milliseconds for parent dialog with reduced time.
    private getCloseDelayForParent(component: DialogComponent, index: number): number {
        let closeDelayParent: number = 0;
        if (index < this.dialogs.length - 1) {
            closeDelayParent = component.closeDelay == 0 ? component.closeDelayParent : component.closeDelay;
        }
        else {
            closeDelayParent = component.closeDelay;
        }
        return closeDelayParent;
    }
}
