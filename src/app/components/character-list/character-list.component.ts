import { Component, OnInit} from '@angular/core';
import {CharactersService} from "../../services/characters.service";
import {Character} from "../../models/characters";
import {map, take} from "rxjs/operators";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = []

  constructor(private charactersService: CharactersService) {
  }

  ngOnInit(): void {
    this.charactersService.getAll().pipe(
      take(1),
      map(({data}) => data.characters),
      map(({results}) => {
        this.characters = results
      })
    ).subscribe();
  }

}
