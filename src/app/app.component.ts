import { Component, ViewChild } from '@angular/core';
import { LightWizardComponent } from './light-wizard/light-wizard.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	isWizardShown: Boolean = false;
	title = 'app works!';
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
}
