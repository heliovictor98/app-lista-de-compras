import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { GrudListaComponent } from "../grud-lista/grud-lista.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    GrudListaComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
