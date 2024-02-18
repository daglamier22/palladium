import {NgModule} from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

const Material = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule {}
