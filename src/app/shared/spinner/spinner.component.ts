import { Component, OnInit } from '@angular/core';
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  loading!: boolean;

  constructor(private loadingService: LoadingService) {
    this.loadingService.isLoading$.subscribe((res) => {
      this.loading = res;
    });
  }

  ngOnInit(): void {
  }

}
