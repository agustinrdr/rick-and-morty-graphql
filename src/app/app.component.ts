import {Component, OnInit} from '@angular/core';
import {LoadingService} from "./services/loading.service";
import {SwUpdate} from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'rick-and-morty-graphql';
  isLoading: boolean = true;

  constructor(private loadingService: LoadingService, private swUpdate: SwUpdate) {
    loadingService.isLoading$.subscribe(res => {
      this.isLoading = res;
    })
  }

  ngOnInit() {
    if(this.swUpdate.isEnabled){
      this.swUpdate.available.subscribe(() =>{
        alert('A new version of this app is available and will be downloaded')
        window.location.reload();
      })
    }
  }

}
