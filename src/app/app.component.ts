import { Component } from '@angular/core';
import {LoadingService} from "./services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rick-and-morty-graphql';
  isLoading: boolean = true;

  constructor(private loadingService: LoadingService) {
    loadingService.isLoading$.subscribe(res => {
      this.isLoading = res;
    })
  }

}
