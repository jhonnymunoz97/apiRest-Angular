import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  usersApi = {
    index  : 'http://127.0.0.1:8000/api/v1/users',
    store  : 'http://127.0.0.1:8000/api/v1/users',
    show   : 'http://127.0.0.1:8000/api/v1/users/{user}',
    update    : 'http://127.0.0.1:8000/api/v1/users/{user}',
    delete : 'http://127.0.0.1:8000/api/v1/users/{user}',
  };

  productsApi = {
    index  : 'http://127.0.0.1:8000/api/v1/products',
    store  : 'http://127.0.0.1:8000/api/v1/products',
    show   : 'http://127.0.0.1:8000/api/v1/products/{product}',
    update    : 'http://127.0.0.1:8000/api/v1/products/{product}',
    delete : 'http://127.0.0.1:8000/api/v1/products/{product}',
  };

}
