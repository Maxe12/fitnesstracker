import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

//Imports from Material modules going in here 
@NgModule({
    imports: [MatButtonModule, MatIconModule],
    exports: [MatButtonModule, MatIconModule]
})
export class MaterialModule {}