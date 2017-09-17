import { Component, ContentChild, Query, ElementRef } from '@angular/core';
import { LightWizardPageTitleComponent } from '../components/light-wizard-page-title.component';
import { LightWizardPageNavTitleComponent } from '../components/light-wizard-page-nav-title.component';
import { DomSanitizer } from '@angular/platform-browser';
import { LightWizardService } from '../light-wizard.service';

@Component({
	selector: 'light-wizard-page',
	templateUrl: './light-wizard-page.component.html',
	styleUrls: ['./light-wizard-page.component.scss']
})
export class LightWizardPageComponent {
	@ContentChild(LightWizardPageTitleComponent, { read: ElementRef }) title: ElementRef;
	@ContentChild(LightWizardPageNavTitleComponent, { read: ElementRef }) navTitle: ElementRef;
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
