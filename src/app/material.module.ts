import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

//Imports from Material modules going in here 
@NgModule({
    imports: [MatIconModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule],
    exports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule]
})
export class MaterialModule {}