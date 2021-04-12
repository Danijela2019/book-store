export class Book {
  constructor(
    public isbn13: string,
    public title: string,
    public subtitle: String,
    public image: string,
    public price: string,
    public url: string,
    public id?: string
  ) {}
}
