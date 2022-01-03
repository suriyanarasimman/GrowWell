import { Component, OnInit } from '@angular/core';
import { Nametosymbol } from 'src/assets/nametosymbol';
import { GeneralService } from '../services/general.service';
import { FormControl } from '@angular/forms';
import { StockDetails } from 'src/assets/stockdetails';

@Component({
  selector: 'app-stockhistory',
  templateUrl: './stockhistory.component.html',
  styleUrls: ['./stockhistory.component.scss']
})
export class StockhistoryComponent implements OnInit {

  public searchInput: String = '';
  public dateInput: String = '';
  public selected: String = "";
  public clicked: String;
  public searchResult: Array<Nametosymbol> = [];
  public stockdetails: StockDetails;

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }
  datecalled(){
    console.log(this.dateInput)
    this.generalService.fetchstockdetails(this.searchInput,this.dateInput).subscribe(
      (response) =>{
this.stockdetails = response
      })

  }

  stockSelected(symbol:String){
    this.selected = symbol;
    this.clicked = "1"
    console.log(symbol)

  }

  fetchSeries(){
    this.clicked ="";
 
    this.generalService.searchstockhistory(this.searchInput).subscribe((response) => {
      this.searchResult = response;
    })


  }


}
