import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CharacterListComponent} from "./components/character-list/character-list.component";
import {CharacterComponent} from "./components/character/character.component";
import {ErrorComponent} from "./shared/error/error.component";

const routes: Routes = [
  {path: '', component: CharacterListComponent},
  {path: 'character/:id', component: CharacterComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: CharacterListComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
