import { Injectable, ChangeDetectorRef, QueryList } from '@angular/core';
import { LightWizardPageComponent } from './light-wizard-page/light-wizard-page.component';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class LightWizardService {
	private pagesCollection: QueryList<LightWizardPageComponent>;
	private activePageIndexSubject: Subject<number> = new Subject<number>();
	private activePageIndex: number;
	private isFinished: Subject<Boolean> = new Subject<Boolean>();
	private isCancelled: Subject<Boolean> = new Subject<Boolean>();
	private nextPageInvoke: Subject<number> = new Subject<number>();
	private previousPageInvoke: Subject<number> = new Subject<number>();
	private cancelWizardInvoke: Subject<{}> = new Subject<{}>();
	private activePageId: Subject<string> = new Subject<string>();
	activePageIdObservable = this.activePageId.asObservable();
	isFinishedObservable = this.isFinished.asObservable();
	isCancelledObservable = this.isCancelled.asObservable();
	nextPageInvokedObservable = this.nextPageInvoke.asObservable();
	previousPageInvokedObservable = this.previousPageInvoke.asObservable();
	cancelWizardInvokedObservable = this.cancelWizardInvoke.asObservable();
	activePageIndexObservable = this.activePageIndexSubject.asObservable();
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
				this.activePageId.next(page.getId());
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
			page.showCancelBtn = true;
			page.showPreviousBtn = index !== 0;
			page.showNextBtn = index !== this.pagesCollection.length - 1;
			page.showFinishBtn = index === this.pagesCollection.length - 1;
		});
	}
	activatePage(pageIndex: number): number {
		let result = null;
		this.pagesCollection.forEach((page: LightWizardPageComponent, index: number) => {
			page.showPage = index === pageIndex;
			if (index === pageIndex) {
				this.activePageIndex = index;
				this.activePageId.next(page.getId());
				result = this.activePageIndex;
			}
		});
		this.activePageIndexSubject.next(this.activePageIndex);
		return result;
	}
	activatePreviousPage() {
		if (this.activePageIndex > 0) {
			const result = this.activatePage(this.activePageIndex - 1);
			if (result) {
				this.previousPageInvoke.next(result);
			}
		}
	}
	activateNextPage() {
		if (this.activePageIndex < this.pagesCollection.length - 1 ) {
			const result = this.activatePage(this.activePageIndex + 1);
			if (result) {
				this.nextPageInvoke.next(result);
			}
		}
	}
	finishWizard() {
		this.isFinished.next(true);
	}
	resetWizard() {
		this.init();
	}
	dismissWizard() {
		this.isCancelled.next(true);
		this.cancelWizardInvoke.next({});
	}
	getRandomInt() {
		return Math.floor(Math.random() * 1000000);
	}
}
