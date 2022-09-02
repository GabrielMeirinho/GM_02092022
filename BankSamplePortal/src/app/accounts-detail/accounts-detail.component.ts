import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppService } from '../app.service';

@Component({
  selector: 'app-accounts-detail',
  templateUrl: './accounts-detail.component.html',
  styleUrls: ['./accounts-detail.component.css']
})
export class AccountsDetailComponent implements OnInit {

  constructor(private service: AppService) {
    
  }


  accounts: any;

  title: String = "Bank Accounts"
 
  loading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.service.getAccounts().subscribe( data => { this.accounts = data.data; console.log(data)});
                      
  }

}
