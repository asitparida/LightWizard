import { Component, AfterViewInit, ContentChildren, QueryList, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { LightWizardService } from './light-wizard.service';
import { LightWizardPageComponent } from './light-wizard-page/light-wizard-page.component';

@Component({
	selector: 'light-wizard',
	templateUrl: './light-wizard.component.html',
	styleUrls: ['./light-wizard.component.scss'],
	providers: [ LightWizardService ]
})
export class LightWizardComponent implements AfterViewInit {
	@ContentChildren(LightWizardPageComponent) pages: QueryList<LightWizardPageComponent> = null;
	@Input() showPageIndexInNav: Boolean = false;
	@Input() showStepMarkers: Boolean = false;
	@Input() hideSideNav: Boolean = false;
	@Input() showBottomNav: Boolean = false;
	@Input() showTopNav: Boolean = false;
	@Input() showNavTitles: Boolean = true;
	@Output() wizardOnNext?: EventEmitter<number> = new EventEmitter<number>();
	@Output() wizardOnPrevious?:EventEmitter<number> = new EventEmitter<number>();
	@Output() wizardOnFinish?: EventEmitter<any> = new EventEmitter<any>();
	@Output() wizardOnCancel?: EventEmitter<any> = new EventEmitter<any>();
	activePageIndex: number = null;
	showLoader: Boolean = false;
	showWizard: Boolean = false;
	constructor(
		private wizardService: LightWizardService
	) { }
	ngAfterViewInit() {
		this.pages.changes.subscribe((pages) => {
			this.wizardService.loadPages(pages);
		});
		this.wizardService.activePageIndexObservable.subscribe((i: number) => {
			this.activePageIndex = i;
		});
		this.wizardService.nextPageInvokedObservable.subscribe((i : number) => {
			this.wizardOnNext.emit(i);
		});
		this.wizardService.previousPageInvokedObservable.subscribe((i : number) => {
			this.wizardOnPrevious.emit(i);
		});
		this.wizardService.cancelWizardInvokedObservable.subscribe(() => {
			this.close();
			this.wizardOnCancel.emit();
		});
		this.wizardService.isFinishedObservable.subscribe(() => {
			this.wizardOnFinish.emit();
		});
		setTimeout(() => {
			this.wizardService.loadPages(this.pages);
			this.wizardService.init();
		});
	}
	activatePage(i: number) {
		this.wizardService.activatePage(i);
	}
	reset() {
		console.log('reset');
		this.wizardService.resetWizard();
	}
	open() {
		this.showWizard = true;
	}
	close() {
		this.showWizard = false;
	}
}
