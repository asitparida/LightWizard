import { Component, ContentChild, Query, ElementRef, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LightWizardPageTitleComponent } from '../components/light-wizard-page-title.component';
import { LightWizardPageNavTitleComponent } from '../components/light-wizard-page-nav-title.component';
import { DomSanitizer } from '@angular/platform-browser';
import { LightWizardService } from '../light-wizard.service';

@Component({
	selector: 'light-wizard-page',
	templateUrl: './light-wizard-page.component.html',
	styleUrls: ['./light-wizard-page.component.scss']
})
export class LightWizardPageComponent implements AfterViewInit {
	@ContentChild(LightWizardPageTitleComponent, { read: ElementRef }) title: ElementRef;
	@ContentChild(LightWizardPageNavTitleComponent, { read: ElementRef }) navTitle: ElementRef;
	@Input() showCancelButtonOverride: Boolean = true;
	@Input() showPreviousButtonOverride: Boolean = true;
	@Input() showNextButtonOverride: Boolean = true;
	@Input() showFinishButtonOverride: Boolean = true;
	@Input() disableCancelButtonOverride: Boolean = false;
	@Input() disablePreviousButtonOverride: Boolean = false;
	@Input() disableNextButtonOverride: Boolean = false;
	@Input() disableFinishButtonOverride: Boolean = false;
	@Output() onWizardPageLoad: EventEmitter<{}> = new EventEmitter<{}>();
	showPage: Boolean = false;
	showPreviousBtn: Boolean = false;
	showNextBtn: Boolean = false;
	showFinishBtn: Boolean = false;
	showCancelBtn: Boolean = false;
	private id: string = null;
	constructor(
		private sanitizer: DomSanitizer,
		private wizardService: LightWizardService
	) { }
	ngAfterViewInit() {
		console.log('page loaded');
		this.wizardService.activePageIdObservable.subscribe((id: string) => {
			if (this.getId() === id) {
				this.onWizardPageLoad.emit();
			}
		});
	}
	getTitle() {
		let result = '';
		if (this.navTitle && this.navTitle.nativeElement) {
			result = (this.navTitle.nativeElement as Element).innerHTML;
		} else if (this.title && this.title.nativeElement) {
			result = (this.title.nativeElement as Element).innerHTML;
		}
		return this.sanitizer.bypassSecurityTrustHtml(result);
	}
	getId() {
		return this.id;
	}
	setId(id: string) {
		this.id = id;
	}
	goWizardPreviousPage() {
		this.wizardService.activatePreviousPage();
	}
	goWizardNextPage() {
		this.wizardService.activateNextPage();
	}
	goWizardFinish() {
		this.wizardService.finishWizard();
	}
	goWizardCancel() {
		this.wizardService.dismissWizard();
	}
}
