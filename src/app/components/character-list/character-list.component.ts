import {Component, OnDestroy, OnInit} from '@angular/core';
import {CharactersService} from "../../services/characters.service";
import {Character} from "../../models/characters";
import {map, take} from "rxjs/operators";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, OnDestroy {

  characters: Character[] = []
  lenght: number = 0;
  pageSize: number = 20;

  constructor(private charactersService: CharactersService) {
  }

  ngOnInit(): void {
    this.charactersService.getAll().pipe(
      take(1),
      map(({data}) => {
        this.lenght = data.characters.info.count;
        return data.characters;
      }),
      map(({results}) => {
        this.characters = results;
      })
    ).subscribe();
    this.charactersService.lookedUpCharacter.subscribe(() =>{
      this.getCharacter();
    })
  }

  ngOnDestroy() {
    this.charactersService.setLookedUpCharacter('');
  }

  pageSelection(pageNumber: PageEvent) {
    if(this.charactersService.lookedUpCharacter.getValue() != '') {
      this.charactersService.searchCharacter(pageNumber.pageIndex == 0 ? 1 : pageNumber.pageIndex+1).pipe(
        take(1),
        map(({data}) => {
          this.lenght = data.characters.info.count;
          return data.characters;
        }),
        map(({results}) => {
          this.characters = results;
        })
      ).subscribe();
    } else {
      this.charactersService.getAll(pageNumber.pageIndex == 0 ? 1 : pageNumber.pageIndex+1).pipe(
        take(1),
        map(({data}) => {
          this.lenght = data.characters.info.count;
          return data.characters;
        }),
        map(({results}) => {
          this.characters = results
        })
      ).subscribe();
    }
  }

  getCharacter() {
    if(this.charactersService.lookedUpCharacter.getValue() == '') {
      this.charactersService.getAll().pipe(
        take(1),
        map(({data}) => {
          this.lenght = data.characters.info.count;
          return data.characters;
        }),
        map(({results}) => {
          this.characters = results
        })
      ).subscribe();
    } else {
      this.charactersService.searchCharacter().pipe(
        take(1),
        map(({data}) => {
          this.lenght = data.characters.info.count;
          return data.characters;
        }),
        map(({results}) => {
          this.characters = results;
        })
      ).subscribe();
    }
  }
}
