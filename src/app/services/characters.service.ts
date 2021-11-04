import { Injectable } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  lookedUpCharacter: BehaviorSubject<String> = new BehaviorSubject<String>('');

  constructor(private apollo: Apollo) { }

  setLookedUpCharacter(character: String) {
    this.lookedUpCharacter.next(character);
  }

  getAll(page: number | string = 1): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          characters(page: ${page}) {
            info{
              count,
              pages,
              next,
              prev
            },
            results {
              id,
              name,
              status,
              species,
              image
            }
          }
        }
      `
    }).valueChanges;
  }

  getOne(charId: number): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          character(id: ${charId}){
            id,
            image,
            name,
            location{
              name
            },
            origin{
              name
            },
            gender
          }
        }
      `
    }).valueChanges;
  }

  searchCharacter(page?: number): Observable<any> {
    if(page) {
      return this.apollo.watchQuery({
        query: gql`
          query {
            characters(page: ${page},filter: {name: "${this.lookedUpCharacter.getValue().toString()}"}) {
              info{
                count,
                pages,
                next,
                prev
              },
              results {
                id,
                name,
                status,
                species,
                image
              }
            }
          }
        `
      }).valueChanges;
    } else {
      return this.apollo.watchQuery({
        query: gql`
          query {
            characters(filter: {name: "${this.lookedUpCharacter.getValue().toString()}"}) {
              info{
                count,
                pages,
                next,
                prev
              },
              results {
                id,
                name,
                status,
                species,
                image
              }
            }
          }
        `
      }).valueChanges;
    }
  }
}
