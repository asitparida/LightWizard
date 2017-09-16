import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LightWizardComponent } from './light-wizard.component';
import { LightWizardPageComponent } from './light-wizard-page/light-wizard-page.component';
import { LightWizardPageTitleComponent } from './light-wizard-page/light-wizard-page-title/light-wizard-page-title.component';
@NgModule({
	declarations: [
		LightWizardComponent,
		LightWizardPageComponent,
		LightWizardPageTitleComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule
	],
	providers: [],
	exports: [
		LightWizardComponent,
		LightWizardPageComponent,
		LightWizardPageTitleComponent
	]
})
export class LightWizardModule { }
