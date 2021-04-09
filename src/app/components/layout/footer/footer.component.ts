import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  linkedinUrl: string =
    'https://www.linkedin.com/in/danijela-milenkovic-926b0a57/';
  githubUrl: string = 'https://github.com/Danijela2019';
  booksApiUrl: string = 'https://api.itbook.store/';
  constructor() {}

  ngOnInit(): void {}

  getFullYear() {
    return new Date().getFullYear();
  }
}
