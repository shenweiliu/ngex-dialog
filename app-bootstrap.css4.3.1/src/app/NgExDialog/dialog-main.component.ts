import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, ReflectiveInjector, Type, HostListener, ElementRef, OnInit } from "@angular/core";
import { DialogComponent } from "./dialog.component";
import { AlignmentDirective } from "./alignment.directive";
import { NgExDialogConfig } from "./dialog-config";

@Component({
    moduleId: module.id.toString(),
    selector: "dialog-main",
    templateUrl: "./dialog-main.component.html"
})
export class DialogMainComponent implements OnInit {
    
    config: any;
    shown: boolean = false;
    content: DialogComponent;
    dialogPaddingTop: number = 0;
    @ViewChild(AlignmentDirective, { static: true }) alignmentDirective: AlignmentDirective;
    @ViewChild('element', { static: true, read: ViewContainerRef }) private element: ViewContainerRef;
    @ViewChild('dialogMainElem', { static: true }) dialogMainElem: ElementRef;
    
    constructor(private resolver: ComponentFactoryResolver, private ngExDialogConfig: NgExDialogConfig)
    { }

    ngOnInit(): void {
        if (this.content.basicType == "prime") {
            this.alignmentDirective.isPrimeType = true;
        }
        //Set for start position based on cursor point if used.
        if (this.content.initElement) {
            this.alignmentDirective.setPosition = {
                initElement: this.content.initElement,                
                h_Offset: this.content.h_Offset,
                v_Offset: this.content.v_Offset,
                h_event: this.content.h_event,
                v_event: this.content.v_event 
            };
        }
        //Pass configured top offset value to alignmentDirective.
        this.alignmentDirective.topOffset = this.content.topOffset == undefined ? this.ngExDialogConfig.merged.topOffset : this.content.topOffset;
    }

    /**
    * Creates and add to DOM main dialog (overlay) parent component
    * @return {DialogHostComponent}
    */
    addComponent(component: Type<DialogComponent>) {
        let factory = this.resolver.resolveComponentFactory(component);
        let injector = ReflectiveInjector.fromResolvedProviders([], this.element.injector);
        let componentRef = factory.create(injector);
        this.element.insert(componentRef.hostView);
        this.content = <DialogComponent>componentRef.instance;
        this.content.dialogMain = this;
        return this.content;
    }

    //Setting values for directives used in this component view.
    //draggable setting is used in ng2-draggable directive code.
    dialogWidth: string;
    isGrayBackground: boolean;    
    isAnimation: boolean; 
    isDraggable: boolean;
    topOffset: number;

    show(): void {
        this.config = this.ngExDialogConfig.merged;

        //Check and overwrite default settings by dialog-level custom configs.
        this.dialogWidth = this.content.width == undefined ? this.config.width : this.content.width;
        if (this.content.width == undefined) this.content.width = this.dialogWidth;
                
        this.isGrayBackground = this.content.grayBackground == undefined ? this.config.grayBackground : this.content.grayBackground;
        if (this.content.grayBackground == undefined) this.content.grayBackground = this.isGrayBackground;

        this.isAnimation = this.content.animation == undefined ? this.config.animation : this.content.animation;
        if (this.content.animation == undefined) this.content.animation = this.isAnimation;

        this.isDraggable = this.content.draggable == undefined ? this.config.draggable : this.content.draggable;
        if (this.content.draggable == undefined) this.content.draggable = this.isDraggable;

        if (this.content.closeByEnter == undefined) this.content.closeByEnter = this.config.closeByEnter;
        if (this.content.closeByEscape == undefined) this.content.closeByEscape = this.config.closeByEscape;
        if (this.content.closeByClickOutside == undefined) this.content.closeByClickOutside = this.config.closeByClickOutside;
        if (this.content.closeAllDialogs == undefined) this.content.closeAllDialogs = this.config.closeAllDialogs;
        if (this.content.closeImmediateParent == undefined) this.content.closeImmediateParent = this.config.closeImmediateParent;
        
        if (this.content.keepOpenForAction == undefined) this.content.keepOpenForAction = this.config.keepOpenForAction;
        if (this.content.keepOpenForClose == undefined) this.content.keepOpenForClose = this.config.keepOpenForClose;

        if (this.content.closeDelay == undefined) this.content.closeDelay = this.config.closeDelay;
        if (this.content.closeDelayParent == undefined) this.content.closeDelayParent = this.config.closeDelayParent;

        //For basic type dialogs only.
        if (this.content.showIcon == undefined && !this.content.showIcon) this.content.showIcon = this.config.showIcon;
        if (this.content.basicType == "message") {
            if (this.content.title == undefined) this.content.title = this.config.messageTitle;
            if (this.content.showIcon)
                if (this.content.icon == undefined || this.content.icon == "") this.content.icon = this.config.messageIcon;
            if (this.content.closeButtonLabel == undefined || this.content.closeButtonLabel == "") {
                this.content.closeButtonLabel = this.config.messageCloseButtonLabel;
                //Use action button pattern if no value for closeButtonLabel.
                if ((this.content.closeButtonLabel == undefined || this.content.closeButtonLabel == "") &&
                    this.content.actionButtonLabel == undefined) {
                    this.content.actionButtonLabel = this.config.messageActionButtonLabel;
                }
            }
        }
        else if (this.content.basicType == "confirm") {
            if (this.content.title == undefined) this.content.title = this.config.confirmTitle;
            if (this.content.showIcon)
                if (this.content.icon == undefined || this.content.icon == "") this.content.icon = this.config.confirmIcon;
            if (this.content.actionButtonLabel == undefined) this.content.actionButtonLabel = this.config.confirmActionButtonLabel;
            if (this.content.closeButtonLabel == undefined) this.content.closeButtonLabel = this.config.confirmCloseButtonLabel;
        }
        
        this.shown = true;
    }

    hide():void {
        this.shown = false;
    }

    clickOutside(event) {      
        if (this.content.closeByClickOutside && event.target.classList.contains('dialog-frame')) {
            this.content.dialogResult();
        }      
    }    

    //Press Esc or Enter key to close dialog.
    @HostListener('window:keydown', ['$event'])
    keyboardInput(event: any) {
        //event.preventDefault();
        event.stopPropagation();
        if ((this.content.closeByEnter && event.keyCode == 13) ||
            (this.content.closeByEscape && event.keyCode == 27)) {
            this.content.dialogResult();
        }
    }
}
