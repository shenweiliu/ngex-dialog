import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService, ExDialog, DialogCache, FocusBlurDirective } from "../NgExDialog/dialog.module";
import { TestDataService } from "./test-data.service";

@Component({
    moduleId: module.id.toString(),
    selector: 'product-dialog',
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.css"]
})
export class ProductComponent extends DialogComponent implements OnInit {    
    model: any = {
        product: {}
    };    
    productDialogTitle: string = "Edit Product";

    constructor(dialogService: DialogService, private exDialog: ExDialog, private testData: TestDataService) {
        super(dialogService);        
    }  

    ngOnInit() {
        //Get data to object for binding to view.
        setTimeout(() => {
            this.model.product = this.testData.getProduct();               
        }, 10);        
    }  

    //Disable click-on input field drag/move.
    setDrag(flag) {
        DialogCache.noDrag = flag;
    };

    saveProduct() {
        var thisRef: any = this;
        //callId values are passed with parent property callerData defined in base DialogComponent.
        if (this.callerData.callId == 0 || this.callerData.callId == 2) {
            this.exDialog.openConfirm({
                title: "Save Confirmation",
                message: "Are you sure to save the product?"
            }).subscribe((result) => {
                if (result) {
                    //Code to save product here...
                    //Notification Message.
                    thisRef.exDialog.openMessage({
                        message: "The product has successfully been saved.",
                        closeAllDialogs: true
                    });
                }                
            });
        }
        else if (this.callerData.callId == 1) {
            this.exDialog.openConfirm({
                title: "Save Confirmation",
                message: "Are you sure to save the product?",
                keepOpenForAction: true
            }).subscribe((result) => {
                if (result) {
                    //Code to save product here...
                    //Notification Message.
                    thisRef.exDialog.openMessage({
                        message: "The product has successfully been saved.",
                        closeAllDialogs: true
                        //If leave original data form dialog there.
                        //closeImmediateParent: true
                    });
                }
            });
        } 
        //Not used.
        //this.result = true;
        //this.dialogResult();
    }

    cancel() {
        var thisRef: any = this;
        if (this.callerData.callId == 0 || this.callerData.callId == 1) {
            this.result = false;
            this.dialogResult();
        }
        else if (this.callerData.callId == 2) {
            this.exDialog.openConfirm({
                title: "Cancel Warning",
                icon: "warning",
                message: "Do you really want to cancel the data editing?",
                keepOpenForAction: true,
                keepOpenForClose: true
            }).subscribe((result) => {
                if (result) {
                    thisRef.exDialog.openMessage({
                        title: "Notification",
                        message: "The editing has been cancelled.",
                        closeAllDialogs: true
                    });
                }
                else {
                    thisRef.exDialog.openMessage({
                        title: "Notification",
                        message: "The editing will continue.",
                        closeImmediateParent: true
                    });
                }
            });
        }  
        //Not used.
        //this.result = false;
        //this.dialogResult();
    }    
}
