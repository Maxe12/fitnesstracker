import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule } from '@angular/material';

//Imports from Material modules going in here 
@NgModule({
    imports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
    exports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule]
})
export class MaterialModule {}