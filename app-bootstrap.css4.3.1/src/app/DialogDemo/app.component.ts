import { Component, HostListener, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ExDialog } from "../NgExDialog/dialog.module";
import { SideMenuComponent } from "./side-menu.component";
import { filter, pairwise } from 'rxjs/operators'; 

@Component({
    moduleId: module.id.toString(),
    selector: 'app-root',
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    @ViewChild(SideMenuComponent, { static: true }) sideMenuComponent: SideMenuComponent;
    @ViewChild("barButton", { static: true }) barButton: ElementRef; 

    constructor(private router: Router, private exDialog: ExDialog, private renderer: Renderer2) {        
    }

    ngOnInit() {
        let pThis: any = this;
        //value[0]: old route; value[1]: new route.
        this.router.events.pipe(
            filter(value => value instanceof NavigationEnd),
            pairwise()
        ).subscribe((value: any) => {
            if (value[1].url != value[0].url) {
                //Close any open dialog.
                let dialogs: any = pThis.exDialog.getDialogArray();
                if (dialogs != undefined && dialogs.length > 0) {
                    //Pass the last component of array to service.
                    pThis.exDialog.clearAllDialogs(dialogs[dialogs.length - 1])
                }
            }
        });
    }

    toggleCollapse() {
        let te = this.sideMenuComponent.menuItems.nativeElement.offsetHeight;
        if (te == 0) {
            this.renderer.setStyle(this.sideMenuComponent.menuItems.nativeElement, 'display', 'block');
        }
        else if (te > 0) {
            this.renderer.setStyle(this.sideMenuComponent.menuItems.nativeElement, 'display', 'none');
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        this.collapseSideMenu();
    }

    onClickMenuItem($event) {
        this.collapseSideMenu();
    }

    collapseSideMenu() {
        //When both toggle button and side menu are shown, any resizing screen will close side menu.
        if (this.barButton.nativeElement.offsetHeight > 0 &&
            this.sideMenuComponent.menuItems.nativeElement.offsetHeight > 0) {
            this.renderer.setStyle(this.sideMenuComponent.menuItems.nativeElement, 'display', 'none');
        }
    }
}
