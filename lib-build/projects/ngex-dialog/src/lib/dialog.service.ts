import { Injectable, ComponentRef, createComponent, ViewContainerRef, ApplicationRef, Injector, EnvironmentInjector, EmbeddedViewRef, Type } from '@angular/core';
import { DialogHostComponent } from './dialog-host.component';
import { DialogComponent } from './dialog.component';
import { Observable } from 'rxjs';

//SW 1/18/2025: Angular standalone needs this service in root scope for persisting
//dislogs and dialogHostComponent objects.
//@Injectable()
@Injectable({
  providedIn: 'root',
})
export class DialogService  {

    dialogs!: any; 
    private dialogHostComponent!: DialogHostComponent;
        
    //constructor(private viewContainerRef: ViewContainerRef,
    //       private applicationRef: ApplicationRef,
    //       private injector: Injector, private envInjector: EnvironmentInjector) {  }

    //setViewContainerRef(viewContainerRef: ViewContainerRef) {
    //   this.viewContainerRef = viewContainerRef;
    //}
    constructor(private applicationRef: ApplicationRef,
      private injector: Injector, private envInjector: EnvironmentInjector) { }

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
        //Old:
        //let componentFactory: any = this.resolver.resolveComponentFactory(DialogHostComponent);
        //let componentRef: any = componentFactory.create(this.injector);
        //This not work if not pass ViewContainerRef from calling components.
        //let componentRef: ComponentRef<DialogHostComponent> = this.viewContainerRef.createComponent(DialogHostComponent, {
        //  injector: this.injector                  
        //});
        let componentRef: ComponentRef<DialogHostComponent> = createComponent(DialogHostComponent, {
          environmentInjector: this.envInjector,
          elementInjector: this.injector
        });

        let componentRootNode: any = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
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
