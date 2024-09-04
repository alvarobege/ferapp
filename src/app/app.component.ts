import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fer-and-irene';
  showPeliculas: boolean = false
  showMusica: boolean = false


  showOption(i: number){
    switch(i){
      case 1:
        this.showPeliculas = true
        this.showMusica = false
        break
      case 2:
        this.showMusica = true
        this.showPeliculas = false
    }
  }


}
