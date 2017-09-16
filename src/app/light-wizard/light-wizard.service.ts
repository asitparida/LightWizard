import { Injectable, ChangeDetectorRef, QueryList } from '@angular/core';
import { LightWizardPageComponent } from './light-wizard-page/light-wizard-page.component';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class LightWizardService {
	private pagesCollection: QueryList<LightWizardPageComponent>;
	private activePageIndexSubject: Subject<number> = new Subject<number>();
	private activePageIndex: number;
	activePageIndexObservable = this.activePageIndexSubject.asObservable();
	activePageId: string;
	constructor(
		private cdr: ChangeDetectorRef
	) { }
	loadPages(pages: any) {
		this.pagesCollection = pages;
		this.initialize();
	}
	init() {
		this.pagesCollection.forEach((page: LightWizardPageComponent, index: number) => {
			page.showPage = index === 0;
			if (index === 0) {
				this.activePageIndex = 0;
				this.activePageId = page.getId();
			}
		});
		this.activePageIndexSubject.next(this.activePageIndex);
		this.cdr.detectChanges();
	}
	initialize() {
		this.pagesCollection.forEach((page: LightWizardPageComponent, index: number) => {
			if (!page.getId()) {
				page.setId('page_' + this.getRandomInt());
			}
			page.showPreviousBtn = index !== 0;
			page.showNextBtn = index !== this.pagesCollection.length - 1;
			page.showFinishBtn = index === this.pagesCollection.length - 1;
		});
	}
	activatePage(pageIndex: number) {
		this.pagesCollection.forEach((page: LightWizardPageComponent, index: number) => {
			page.showPage = index === pageIndex;
			if (index === pageIndex) {
				this.activePageIndex = index;
				this.activePageId = page.getId();
			}
		});
		this.activePageIndexSubject.next(this.activePageIndex);
	}
	activatePreviousPage() {
		if (this.activePageIndex > 0) {
			this.activatePage(this.activePageIndex - 1);
		}
	}
	activateNextPage() {
		if (this.activePageIndex < this.pagesCollection.length - 1 ) {
			this.activatePage(this.activePageIndex + 1);
		}
	}
	getRandomInt() {
		return Math.floor(Math.random() * 1000000);
	}
}
