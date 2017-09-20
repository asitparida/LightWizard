import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { LightWizardComponent } from './light-wizard/light-wizard.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
	isWizardShown: Boolean = false;
	sideNavEnabled: Boolean = true;
	showNavTitles: Boolean = true;
	showTopNav: Boolean = false;
	showBottomNav: Boolean = false;
	showCancelButtons: Boolean = true;
	private index: number = 0;
	@ViewChild('wizard') wizard: LightWizardComponent;
	openWizard() {
		this.wizard.open();
		this.isWizardShown = true;
	}
	onWizardNext(i) {
		console.log('onWizardNext : index ' + i);
		setTimeout(() => {
			this.wizard.showLoader = true;
			setTimeout(() => {
				this.wizard.showLoader = false;
			}, 2000);
		});
	}
	onWizardFinish() {
		this.isWizardShown = false;
		this.wizard.close();
		setTimeout(() => {
			this.wizard.reset();
		});
	}
	onWizardCancel() {
		this.isWizardShown = false;
		this.wizard.close();
		this.wizard.reset();
	}
	ngAfterViewInit () {
		setTimeout(() => {
			this.isWizardShown = true;
			this.sideNavEnabled = true;
			this.wizard.open();
		});
	}
	toggleNav() {
		this.index = this.index + 1;
		switch (this.index % 3) {
			case 0: {
				this.sideNavEnabled = true;
				this.showBottomNav = false;
				this.showTopNav = false;
				break;
			}
			case 1: {
				this.sideNavEnabled = false;
				this.showBottomNav = true;
				this.showTopNav = false;
				break;
			}
			case 2: {
				this.sideNavEnabled = false;
				this.showBottomNav = false;
				this.showTopNav = true;
				break;
			}
			default: break;
		}
	}
	onLifePageLoaded() {
		console.log('onLifePageLoaded');
	}
}
