import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LightWizardComponent } from './light-wizard.component';
import { LightWizardPageComponent } from './light-wizard-page/light-wizard-page.component';
import { LightWizardPageTitleComponent } from './components/light-wizard-page-title.component';
import { LightWizardPageNavTitleComponent } from './components/light-wizard-page-nav-title.component';
import { LightWizardService } from './light-wizard.service';

@NgModule({
	declarations: [
		LightWizardComponent,
		LightWizardPageComponent,
		LightWizardPageTitleComponent,
		LightWizardPageNavTitleComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [
		LightWizardService
	],
	exports: [
		LightWizardComponent,
		LightWizardPageComponent,
		LightWizardPageTitleComponent,
		LightWizardPageNavTitleComponent
	]
})
export class LightWizardModule { }
