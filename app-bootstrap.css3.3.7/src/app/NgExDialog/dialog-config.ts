import { Injectable } from '@angular/core';

@Injectable()
export class NgExDialogConfig { 
    merged: any;    
    defaults: any = {
        //Please see properties of calling parameter object in dialog.component.ts.

        //App level settings ----------------
        topOffset: 50, //pix nubmer.
        draggable: true,
        moveCursor: 'default', //'move' or 'default'.
        
        //Animation fade-in time is set in bootstrap.css by default (0.3s).
        //You can overwrite the value in dialog-main.component.css.
        animation: true,

        //Dialog level settings --------------------
        //Background color can also be set in dialog-main.component.css.
        grayBackground: true,
        width: '40%',

        ////Set postion usually specified in client openPrime call.        
        //initElement: undefined, //nativeElement
        //h_Offset: 0,
        //v_Offset: 0,
        //h_event: 0,  //IE 11
        //v_event: 0,   //IE 11

        //Animation fade-out time in milliseconds.
        closeDelay: 500,

        //Fade-out time delay in milliseconds for multiple parent dialogs when closing all together.
        closeDelayParent: 50,

        closeByEnter: false,
        closeByEscape: true,
        closeByClickOutside: true,

        //Usually dialog-level only:
        closeAllDialogs: false,
        closeImmediateParent: false,
        keepOpenForAction: false,
        keepOpenForClose: false,

        //Dialog-level exclusive, no default set but listed here for reference.
        //beforeActionCallback: undefined,
        //beforeCloseCallback: undefined,

        //Default values for predefined base type dialogs (message or confirm) only:
        messageTitle: 'Information',
        confirmTitle: 'Confirmation',

        //Two kinds of button labels in Parameter object for Opening dialog are:
        //actionButtonLabel
        //closeButtonLabel

        //These are for setting defaults only. If passed from parameter object, use these:
        //actionButtonLabel
        //closeButtonLabel
        //--------------------------------------------------------------------
        //Only singel button should be used for basic message dialog, which uses close button pattern by default.
        //Switch to use action button pattern will change button CSS style and set Observable.result = true.
        messageActionButtonLabel: '',
        messageCloseButtonLabel: 'OK',

        confirmActionButtonLabel: 'Yes',
        confirmCloseButtonLabel: 'No',
        //End for setting defaults only----------------------------------------

        showIcon: true,
        messageIcon: 'info',
        confirmIcon: 'question',

        //Base type dialog only - no default value set here but list these for references.
        //dialogAddClass
        //headerAddClass
        //titleAddClass
        //bodyAddClass
        //messageAddClass
        //footerAddClass
        //actionButtonAddClass
        //closeButtonAddClass
    }

    private _appConfig: any = {};
    get appConfig(): any {
        return this._appConfig;
    }
    set appConfig(v: any) {
        this._appConfig = v;
        this.merged = Object.keys(this._appConfig).length ? Object.assign(this.defaults, this._appConfig) : this.defaults;
    }

    constructor() {
        this.merged = this.defaults;        
    } 
    
}
