import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-grud-lista',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './grud-lista.component.html',
  styleUrl: './grud-lista.component.scss'
})
export class GrudListaComponent {

}
