import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, Type } from '@angular/core';
import { DialogHostComponent } from './dialog-host.component';
import { DialogComponent } from './dialog.component';
import { Observable } from 'rxjs';

@Injectable()
export class DialogService  {

    dialogs!: any; 
    private dialogHostComponent!: DialogHostComponent;
        
    constructor(private resolver: ComponentFactoryResolver, private applicationRef: ApplicationRef, private injector: Injector) {}

    /**
    * Adds dialog.
    * @return {Observable<any>}
    */
    addDialog(component:Type<DialogComponent>, data?:any, index?:number): Observable<any> {
        //Create an instance of dialogMainComponent if not exist.
        if (!this.dialogHostComponent) {
            this.dialogHostComponent = this.createDialogHost();
        }
        //Populate dialogs array for access by service caller.
        this.dialogs = this.dialogHostComponent.dialogs;

        return this.dialogHostComponent.addDialog(component, data, index);
    }
    
    //Hides and removes dialog from DOM    
    removeDialog(component: DialogComponent): void {      
        if (!this.dialogHostComponent) {
            return;
        }
                
        //Closing all dialogs.
        if (component.closeAllDialogs)
        {
            this.dialogHostComponent.removeAllDialogs();
        }
        else if (component.closeImmediateParent) {
            this.dialogHostComponent.removeDialogAndParent(component);
        }
        else {
            this.dialogHostComponent.removeDialog(component);
        }        
    }

    removeAllDialogs(): void {
        this.dialogHostComponent.removeAllDialogs();
    }

    /**
    * Creates and add to DOM top-level dialog host component
    * @return {DialogHostComponent}
    */
    private createDialogHost(): DialogHostComponent {
        let componentFactory: any = this.resolver.resolveComponentFactory(DialogHostComponent);
        let componentRef: any = componentFactory.create(this.injector);
        let componentRootNode: any = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        //SW 1/14/2018 Change for Angular 5
        //let componentRootViewConainer = this.applicationRef['_rootComponents'][0]; //Angular 4
        let componentRootViewConainer: any = this.applicationRef['components'][0];

        let rootLocation: Element = (componentRootViewConainer.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.applicationRef.attachView(componentRef.hostView);

        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        });

        rootLocation.appendChild(componentRootNode);

        return componentRef.instance;
    }    
}
