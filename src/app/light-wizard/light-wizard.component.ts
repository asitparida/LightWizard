import { Component, AfterViewInit, ContentChildren, QueryList } from '@angular/core';
import { LightWizardService } from './light-wizard.service';
import { LightWizardPageComponent } from './light-wizard-page/light-wizard-page.component';

@Component({
	selector: 'light-wizard',
	templateUrl: './light-wizard.component.html',
	styleUrls: ['./light-wizard.component.scss'],
	providers: [LightWizardService]
})
export class LightWizardComponent implements AfterViewInit {
	@ContentChildren(LightWizardPageComponent) pages: QueryList<LightWizardPageComponent> = null;
	constructor(
		private wizardService: LightWizardService
	) { }
	ngAfterViewInit() {
		this.pages.changes.subscribe((pages) => {
			this.wizardService.loadPages(pages);
		});
		setTimeout(() => {
			this.wizardService.pagesCollection = this.pages;
			this.wizardService.init();
		});
	}
}
