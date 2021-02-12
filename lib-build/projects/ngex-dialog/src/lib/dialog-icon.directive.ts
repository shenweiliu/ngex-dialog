import { Directive, Input, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
@Directive({
    selector: '[dialog-icon]'
})

export class DialogIconDirective implements AfterViewInit {
    constructor(private element: ElementRef, private renderer: Renderer2) {
    }
    
    @Input('dialog-icon') option: string;
    
    ngAfterViewInit() {        
        setTimeout(() => {
            let cssClass: string = "";
            switch (this.option) {
                case "info":
                    cssClass = "dialog-icon-info";
                    break;
                case "warning":
                    cssClass = "dialog-icon-warning";
                    break;
                case "error":
                    cssClass = "dialog-icon-error";
                    break;
                case "question":
                    cssClass = "dialog-icon-question";
                    break;                
                default:
                   break;
            }
            if (cssClass != "")
                this.renderer.addClass(this.element.nativeElement, cssClass);
        }, 100);        
    }
}
