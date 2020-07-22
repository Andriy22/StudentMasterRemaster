import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminClassesComponent } from './classes/classes.component';
import { InputModalComponent } from './classes/modals/input-modal/input-modal.component';

const COMPONENTS = [AdminClassesComponent, InputModalComponent];
const COMPONENTS_DYNAMIC = [InputModalComponent];

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class AdminModule {}
