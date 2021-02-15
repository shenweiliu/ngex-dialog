//SW: added new base component.
import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { DialogComponent } from "./dialog.component";
import { DialogService } from "./dialog.service";
import { FocusBlurDirective } from './focus-blur.directive';

@Component({    
    selector: 'basic-dialog',
    template: `<div class="dialog-content" #dialogElem>
      <div class="dialog-header" #headerElem>
          <!--Using focus-blur directive to move focus from caller if it's UI element-->
          <button type="button" class="close" [focus-blur]="'focus_blur'" (click)="close()">&times;</button>
          <h4 class="dialog-title" #titleElem>{{title}}</h4>
      </div>
      <div class="dialog-body" #bodyElem>
          <table style="width:100%;">
              <tr>
                  <td>
                      <div *ngIf="showIcon" [dialog-icon]="icon"></div>
                      <!--<div class="dialog-icon-info"></div>-->
                  </td>
                  <td>
                    <p #messageElem>{{message}}</p>                  
                  </td>
              </tr>
          </table>
      </div>
      <div class="dialog-buttons dialog-footer" #footerElem>
          <button *ngIf="closeButtonLabel != undefined && closeButtonLabel != ''" type="button" class="dialog-button dialog-button-secondary" #closeButtonElem (click)="close()">{{closeButtonLabel}}</button>
          <button *ngIf="actionButtonLabel != undefined && actionButtonLabel != ''" type="button" class="dialog-button dialog-button-primary" #actionButtonElem (click)="action()">{{actionButtonLabel}}</button>
      </div>
  </div>`  
})
export class BasicDialogComponent extends DialogComponent implements AfterViewInit {

    constructor(dialogService: DialogService, private renderer: Renderer2) {
        super(dialogService);        
    }

    title: string;
    message: string;
    icon: string;

    //Adding CSS classes to elements.
    @ViewChild("dialogElem", { static: true }) dialogElem: ElementRef;
    @ViewChild("headerElem", { static: true }) headerElem: ElementRef;
    @ViewChild("titleElem", { static: true }) titleElem: ElementRef;
    @ViewChild("bodyElem", { static: true }) bodyElem: ElementRef;
    @ViewChild("messageElem", { static: true }) messageElem: ElementRef;
    @ViewChild("footerElem", { static: true }) footerElem: ElementRef;
    @ViewChild("actionButtonElem", { static: true }) actionButtonElem: ElementRef;
    @ViewChild("closeButtonElem", { static: true }) closeButtonElem: ElementRef;
    
    ngAfterViewInit() {
        if (this.dialogAddClass != undefined && this.dialogAddClass != "")
            this.renderer.addClass(this.dialogElem.nativeElement, this.dialogAddClass);
        if (this.headerAddClass != undefined && this.headerAddClass != "")
            this.renderer.addClass(this.headerElem.nativeElement, this.headerAddClass);
        if (this.titleAddClass != undefined && this.titleAddClass != "")
            this.renderer.addClass(this.titleElem.nativeElement, this.titleAddClass);
        if (this.bodyAddClass != undefined && this.bodyAddClass != "")
            this.renderer.addClass(this.bodyElem.nativeElement, this.bodyAddClass);
        if (this.messageAddClass != undefined && this.messageAddClass != "")
            this.renderer.addClass(this.messageElem.nativeElement, this.messageAddClass);
        if (this.footerAddClass != undefined && this.footerAddClass != "")
            this.renderer.addClass(this.footerElem.nativeElement, this.footerAddClass);
        if (this.actionButtonAddClass != undefined && this.actionButtonAddClass != "")
            this.renderer.addClass(this.actionButtonElem.nativeElement, this.actionButtonAddClass);
        if (this.closeButtonAddClass != undefined && this.closeButtonAddClass != "")
            this.renderer.addClass(this.closeButtonElem.nativeElement, this.closeButtonAddClass);
    }
    
    action() {        
        this.result = true;
        this.dialogResult();
    }

    close() {            
        this.result = false;
        this.dialogResult();        
    }

    ////If NOT set "closeByEnter", focus on action button for 1. fix issue of pressing Enter to open dialog again; 2 pressing Enter will close dialog.
    //@ViewChild("actionButton")
    //set actionButton(_input: ElementRef | undefined) {        
    //    if (_input !== undefined) {
    //        let pThis: any = this;
    //        setTimeout(() => {
    //            pThis._input.nativeElement.focus();               
    //        }, 0);
    //    }                
    //}   
    
}
