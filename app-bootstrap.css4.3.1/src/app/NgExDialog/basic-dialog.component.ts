//SW: added new base component.
import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { DialogComponent } from "./dialog.component";
import { DialogService } from "./dialog.service";
import { FocusBlurDirective } from './focus-blur.directive';

@Component({
    moduleId: module.id.toString(),
    selector: 'basic-dialog',
    templateUrl: "./basic-dialog.component.html"
    //styleUrls: ["./basic-dialog.component.css"] 
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
