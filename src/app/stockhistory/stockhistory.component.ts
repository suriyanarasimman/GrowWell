import { Component, OnInit } from '@angular/core';
import { Nametosymbol } from 'src/assets/stockhistory/nametosymbol';
import { GeneralService } from '../services/general.service';
import { FormControl } from '@angular/forms';
import { StockDetails } from 'src/assets/stockhistory/stockdetails';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-stockhistory',
  templateUrl: './stockhistory.component.html',
  styleUrls: ['./stockhistory.component.scss']
})
export class StockhistoryComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  public searchInput: String = '';
  public dateInput: String = '';
  public selected: String = "";
  public selectedFullname:String ="";
  public clicked: String;
  public searchResult: Array<Nametosymbol> = [];
  public stockdetails: StockDetails;
  public Submitted1: String = "0";

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
  }
  datecalled(){
    // console.log(this.dateInput)
    this.subscription.unsubscribe();
    // console.log(this.searchInput)
    for (var i = 0; i < this.searchResult.length; i++){
      if (this.searchResult[i].fullnames == this.searchInput){
        this.selected = this.searchResult[i].symbo;
      }
    }
    this.subscription =  this.generalService.fetchstockdetails(this.selected,this.dateInput).subscribe(
      (response) =>{
        this.stockdetails = response;
        this.Submitted1 ="1";
        // console.log("Changes made")
        // console.log(this.stockdetails)
        // console.log(this.dateInput)
        // console.log(this.selected)
      })
      
  }

  stockSelected(symbol:String,fullname: String){
    this.selected = symbol;
    this.selectedFullname = fullname;
    this.clicked = "1"
    // console.log("Inside")
    // console.log(symbol)
    // console.log(this.selectedFullname)

  }

  fetchSeries(){
    this.clicked ="";
 
    this.generalService.searchstockhistory(this.searchInput).subscribe((response) => {
      this.searchResult = response;
    })


  }


}
