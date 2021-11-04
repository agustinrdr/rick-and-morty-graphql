import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { map, take, tap } from 'rxjs/operators';
import { Character } from '../../models/characters';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  character!: Character;

  constructor(
    private charactersService: CharactersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.charactersService
      .getOne(this.activatedRoute.snapshot.params.id)
      .pipe(
        take(1),
        map(({ data }) => data.character),
        tap((character) => {
          this.character = character;
        })
      )
      .subscribe();
  }
}
