import { Component, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({    
    selector: 'side-menu',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: "./side-menu.component.html",
    styleUrls: ["./side-menu.component.css"]

})
export class SideMenuComponent {    
    @ViewChild('menuItems', { static: true }) menuItems!: ElementRef;    
    @Output() menuItemVisited: EventEmitter<boolean> = new EventEmitter<boolean>();
    constructor() {
    }

    menuItemClicked() {
        this.menuItemVisited.emit(true);
    }
}
