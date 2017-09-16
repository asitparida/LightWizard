import { Component, ContentChild, Query, ElementRef } from '@angular/core';
import { LightWizardPageTitleComponent } from './light-wizard-page-title/light-wizard-page-title.component';
import { DomSanitizer } from '@angular/platform-browser';
import { LightWizardService } from '../light-wizard.service';

@Component({
	selector: 'light-wizard-page',
	templateUrl: './light-wizard-page.component.html',
	styleUrls: ['./light-wizard-page.component.scss']
})
export class LightWizardPageComponent {
	@ContentChild(LightWizardPageTitleComponent, { read: ElementRef }) title: ElementRef;
	showPage: Boolean = false;
	showPreviousBtn: Boolean = false;
	showNextBtn: Boolean = false;
	showFinishBtn: Boolean = false;
	private id: string = null;
	constructor(
		private sanitizer: DomSanitizer,
		private wizardService: LightWizardService
	) { }
	getTitle() {
		let result = '';
		if (this.title.nativeElement) {
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
}
