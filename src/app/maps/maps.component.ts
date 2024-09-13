import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent {

  @ViewChild('inputField')
  inputField!: ElementRef;

  autocomplete: google.maps.places.Autocomplete | undefined


  ngAfterViewInit(){
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement)
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace()
      console.log(place)
    })
  }
  

}
