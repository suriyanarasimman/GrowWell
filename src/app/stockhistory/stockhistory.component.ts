import { Component, OnInit } from '@angular/core';
import { Nametosymbol } from 'src/assets/nametosymbol';
import { GeneralService } from '../services/general.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-stockhistory',
  templateUrl: './stockhistory.component.html',
  styleUrls: ['./stockhistory.component.scss']
})
export class StockhistoryComponent implements OnInit {

  public searchInput: String = '';
  public searchResult: Array<Nametosymbol> = [];

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }

  fetchSeries(){
 
    this.generalService.searchstockhistory(this.searchInput).subscribe((response) => {
      this.searchResult = response;
      console.log(response)
    })

    for(var i=0;i<this.searchResult.length;i++){
      console.log(this.searchResult)
    }
  }


}
