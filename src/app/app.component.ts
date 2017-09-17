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
	@ViewChild('wizard') wizard: LightWizardComponent;
	openWizard() {
		this.wizard.open();
		this.isWizardShown = true;
	}
	onWizardNext() {
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
	ngAfterViewInit () {
		// setTimeout(() => {
		// 	this.isWizardShown = true;
		// 	this.sideNavEnabled = true;
		// 	this.wizard.open();
		// });
	}
}
