import { Component, Injectable, AfterViewInit } from '@angular/core';
import { ExDialog } from "../NgExDialog/dialog.module";
import { ProductComponent } from './product.component';

@Component({
    moduleId: module.id.toString(),
    selector: 'sample-main',
    templateUrl: "./sample-main.component.html"
})
export class SampleMainComponent implements AfterViewInit{
    
    constructor(private exDialog: ExDialog) { }
    
    ngAfterViewInit() {
        //this.dataCache.callId = this.callId;
    }

    openSimpleInfo() {    
        this.exDialog.openMessage("This is called from a simple line of parameters.");
    }

    openSimpleWarning() {
        this.exDialog.openMessage("This is called from a simple line of parameters.", "Warning", "warning");
    }

    openSimpleError() {
        this.exDialog.openMessage("This is called from a simple line of parameters.", "Error", "error");
    }

    dialogNoIconAndGrayBack() {
        this.exDialog.openMessage({
            title: "No Icon, No Gray",
            //icon property needs to be here to overwrite default value. It can be "".
            icon: "none", 
            message: "This is called by passing a parameter object",
            grayBackground: false
        });
    }

    dialogNoAnimationDrag() {
        this.exDialog.openMessage({
            message: "Animation and drag-move disabled.",
            animation: false,
            draggable: false
        });
    }

    differentHeaderFooterStyles() {
        this.exDialog.openMessage({            
            title: "New Look",
            showIcon: false,
            message: "Show header and footer in other styles.",
            headerAddClass: 'my-dialog-header',
            bodyAddClass: 'my-dialog-body',
            footerAddClass: 'my-dialog-footer'
        });
    }

    openSimpleConfirmation() {
        this.exDialog.openConfirm("Would you like to close the dialog and open another one?")
        .subscribe((result) => { 
            if (result) {                
                //Test Observable result true.
                this.exDialog.openMessage("This is another dialog."); 
            }
            else {
                //Test Observable result false.
                this.exDialog.openMessage("The dialog has been closed.");
            }
        });
    }

    keepParentOpenAndNoCloseByOutside() {
        this.exDialog.openConfirm({            
            message: "Would you like to keep this dialog opening after showing the second?",
            keepOpenForAction: true,
            keepOpenForClose: true,
            closeByClickOutside: false
        }).subscribe((result) => { 
            if (result) {
                this.exDialog.openMessage({
                    message: "This will close all opened dialogs.",
                    closeAllDialogs: true,
                    closeByClickOutside: false
                });
            } 
            else {
                this.exDialog.openMessage({
                    message: "You will close the dialog.",
                    closeAllDialogs: true,
                    closeByClickOutside: false
                });                
            }           
        });
    }
        
    openDialogBeforeClosingParentUsingCallback() {
        let thisRef: any = this;
        this.exDialog.openConfirm({
            actionButtonLabel: "Continue",
            closeButtonLabel: "Cancel",
            message: "What next step would you like to take?",
            beforeCloseCallback: function (value) {
                let rtnObs = thisRef.exDialog.openConfirm({
                    message: "Do you really want to cancel it?"
                });
                return rtnObs;                                
            }
        }).subscribe((result) => {
            if (result) {
                //Test Observable result true.
                this.exDialog.openMessage("The action is continue...");
            }            
            else
            {
                //Test Observable result false.
                this.exDialog.openMessage("The action has been cancelled.", "Notification");
            }
        });
    }

    dataFormDialog(id) {        
        this.exDialog.openPrime(ProductComponent, {
            width: '450px',
            //topOffset: 30, //pix number. Comment out to use default 50.
            callerData: { callId: id }, //Pass non-dialog data.
            beforeCloseCallback: this.refreshGrid
            //animation: false,
            //grayBackground: false            
        })
        //.subscribe((result) => {
        //    if (result) {                
        //    }
        //    else {
        //    }
        //})
        ;
    };

    //Callback function to refresh the table. 
    refreshGrid() {
        let te = "";
        return true;
    } 
}
