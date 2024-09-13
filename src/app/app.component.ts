import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fer-and-irene';
  showPeliculas: boolean = false
  showPics: boolean = false
  showMaps: boolean = false


  showOption(i: number){
    switch(i){
      case 1:
        this.showPeliculas = true
        this.showPics = false
        this.showMaps = false
        break
      case 2:
        this.showPeliculas = false
        this.showPics = true
        this.showMaps = false
        break
      case 3:
        this.showPeliculas = false
        this.showPics = false
        this.showMaps = true
        break

    }
  }


}
