import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CharactersService} from "../../services/characters.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(private charactersService: CharactersService) { }

  ngOnInit(): void {
  }


  lookUpCharacter(clear?: boolean){
    if(clear) {
      this.charactersService.setLookedUpCharacter('');
    } else {
      this.charactersService.setLookedUpCharacter(this.searchInput.nativeElement.value);
    }
  }

}
