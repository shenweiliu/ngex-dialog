
export const DialogConfig: any = {
    //Please see properties of calling parameter object in dialog.component.ts.
    //App level settings ----------------
    //Dialog min pix space to screen top (default: 50).
    topOffset: 50,
    draggable: true,
    moveCursor: 'default', //'move' or 'default'.
    //Animation fade-in time is set in bootstrap.css by default (0.3s).
    //You can overwrite the value in ex-dialog.css.
    animation: true,    
    //Background color intensity can be set in ex-dialog.css.
    grayBackground: true,
    //width (default: '40%') --commented out below.
    //width: '40%',
    //Animation fade-out time in milliseconds (default: 500).
    closeDelay: 400,
    //Fade-out time delay in milliseconds for multiple parent dialogs when closing all together (default: 50).
    closeDelayParent: 20,
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
    //Only single button should be used for basic message dialog, which uses close button pattern by default.
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
};
