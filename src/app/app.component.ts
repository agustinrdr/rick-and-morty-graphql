import {Component, OnInit} from '@angular/core';
import {LoadingService} from "./services/loading.service";
import {SwUpdate} from "@angular/service-worker";
import {MatDialog} from "@angular/material/dialog";
import {UpdateDialogComponent} from "./shared/update-dialog/update-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rick-and-morty-graphql';
  isLoading: boolean = true;

  constructor(private loadingService: LoadingService, private swUpdate: SwUpdate,
              public dialog: MatDialog) {
    loadingService.isLoading$.subscribe(res => {
      this.isLoading = res;
    })
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
          this.dialog.open(UpdateDialogComponent).afterClosed().subscribe(() => {
            window.location.reload();
          })
        }
      )
    }
  }

}
