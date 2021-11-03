import { Injectable } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private apollo: Apollo) { }

  getAll(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          characters {
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
            }
          }
        }
      `
    }).valueChanges;
  }
}
