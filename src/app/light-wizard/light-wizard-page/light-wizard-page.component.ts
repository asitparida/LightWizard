import { Component, ContentChild, Query, ElementRef } from '@angular/core';
import { LightWizardPageTitleComponent } from './light-wizard-page-title/light-wizard-page-title.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'light-wizard-page',
	templateUrl: './light-wizard-page.component.html',
	styleUrls: ['./light-wizard-page.component.scss']
})
export class LightWizardPageComponent {
	@ContentChild(LightWizardPageTitleComponent, { read: ElementRef }) title: ElementRef;
	showPage: Boolean = false;
	constructor(
		private sanitizer: DomSanitizer
	) { }
	getTitle() {
		let result = '';
		if (this.title.nativeElement) {
			result = (this.title.nativeElement as Element).innerHTML;
		}
		return this.sanitizer.bypassSecurityTrustHtml(result);
	}
}
