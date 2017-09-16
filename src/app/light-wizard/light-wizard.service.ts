import { Injectable, ChangeDetectorRef, QueryList } from '@angular/core';
import { LightWizardPageComponent } from './light-wizard-page/light-wizard-page.component';

@Injectable()
export class LightWizardService {
	pagesCollection: QueryList<LightWizardPageComponent>;
	constructor(
		private cdr: ChangeDetectorRef
	) { }
	loadPages(pages: any) {
		this.pagesCollection = pages;
	}
	init() {
		this.pagesCollection.forEach((page: LightWizardPageComponent, index: number) => {
			page.showPage = index === 0;
		});
		this.cdr.detectChanges();
	}
}
