import { Directive, HostListener, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgExDialogConfig } from './dialog-config';

@Directive({
    selector: '[vertical-center]'
})
export class AlignmentDirective implements OnInit {

    constructor(private element: ElementRef, private renderer: Renderer2, private ngExDialogConfig: NgExDialogConfig) {
    }
    
    //Passed from parent view. x?
    dialogPaddingTop: number = 0;

    topOffset: number = 0;    
    isPrimeType: boolean;
    setPosition: any = {
        initElement: undefined,
        h_Offset: 0,
        v_Offset: 0,
        h_event: undefined,
        v_event: undefined,
        h_scroll: undefined,
        v_scroll: undefined
    };

    ngOnInit() {
        //Initial load need a little top offset.
        this.SetCenter(undefined, true);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        setTimeout(() => {
            this.SetCenter(event);
        }, 150);        
    }

    SetCenter(event?: any, isInit?: boolean) {
        let eventTarget = event == undefined ? window : event.target;
        let wh = eventTarget.innerHeight;
        let sx = eventTarget.scrollX;  //left invisible width when scroll right.
        let sy = eventTarget.scrollY;  //Top invisible height when scroll down.
        let ot = this.element.nativeElement.offsetTop;
        let cho = this.element.nativeElement.offsetHeight;
        let ch = this.element.nativeElement.offsetHeight - this.dialogPaddingTop; //Dialog visible height

        //IE doesn't support scrollY but it automatically scrolls back to the top 0 position.
        //The scrollY needs to be added for Google Chrome, Firefox, and Microsoft Edge.
        //let paddingTopValue = (wh - ch) / 2 + (sy || 0) - DialogConfig.topOffset; 

        if (this.setPosition.initElement) {
            //Set position based on cursor point if used.
            //Horizontal alignment. 
            let rstLeft: number = this.setPosition.initElement.offsetLeft + this.setPosition.h_Offset;
            if (sx) {
                rstLeft -= sx;
            }
            else {
                //Browsers not support scrollX.
                if (this.setPosition.h_scroll == undefined && this.setPosition.h_event) {
                    //Get scroll length value.
                    this.setPosition.h_scroll = this.setPosition.initElement.offsetLeft - this.setPosition.h_event;
                }
                rstLeft -= this.setPosition.h_scroll;
            }                       
            this.element.nativeElement.style.position = 'absolute';
            this.element.nativeElement.style.left = rstLeft.toString() + 'px';

            //Vertical alignment if specifying start position.            
            let rstTop: number = this.setPosition.initElement.offsetTop + this.setPosition.v_Offset;
            if (sy) {
                rstTop -= sy;
            }
            else {
                //Browsers not support scrollY.
                if (this.setPosition.v_scroll == undefined && this.setPosition.v_event) {
                    //Get scroll length value.
                    this.setPosition.v_scroll = this.setPosition.initElement.offsetTop - this.setPosition.v_event;
                }
                rstTop -= this.setPosition.v_scroll;
            }
            this.element.nativeElement.style.top = rstTop.toString() + 'px';             
        }
        else {
            //For most dynamic filled content, offsetHeight is very small.
            if (this.isPrimeType) {
                if (ch < 350) {
                    ch = 350;
                }
            }
            let paddingTopValue: number = (wh - ch) / 2.1; //- this.topOffset; 
            
            if (paddingTopValue < 0) {
                paddingTopValue = 0;
            }
            else {
                //Need to adjust padding-top.
                if (this.isPrimeType) {
                    if (paddingTopValue > this.topOffset) {
                        paddingTopValue = this.topOffset;
                    }
                    if (wh <= cho) {
                        paddingTopValue = 0
                    }
                }
                else {
                    paddingTopValue = paddingTopValue * 0.9 - this.topOffset;
                }
            }

            //Cache dialogPaddingTop value for use in next resize.
            this.dialogPaddingTop = paddingTopValue;

            //if (isInit) {
            //    paddingTopValue = paddingTopValue - this.ngExDialogConfig.merged.topOffset / 1.5;
            //}

            this.renderer.setStyle(this.element.nativeElement, 'padding-top', paddingTopValue + 'px');
        
            this.renderer.setStyle(this.element.nativeElement, 'margin-right', 'auto');
            this.renderer.setStyle(this.element.nativeElement, 'margin-left', 'auto');
        }        
    }
}
