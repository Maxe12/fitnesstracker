import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';

//Imports from Material modules going in here 
@NgModule({
    imports: [
        MatButtonModule, 
        MatIconModule, 
        MatInputModule, 
        MatFormFieldModule, 
        MatDatepickerModule, 
        MatNativeDateModule, 
        MatCheckboxModule, 
        MatSidenavModule,
        MatRadioModule, 
        MatListModule
    ],
    exports: [
        MatButtonModule, 
        MatIconModule, 
        MatInputModule, 
        MatFormFieldModule, 
        MatDatepickerModule, 
        MatNativeDateModule, 
        MatCheckboxModule, 
        MatSidenavModule, 
        MatToolbarModule,
        MatRadioModule,
        MatListModule
    ]
})
export class MaterialModule {}