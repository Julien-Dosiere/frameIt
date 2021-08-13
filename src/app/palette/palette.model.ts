export class Palette {
  custom: string ;
  black: string;
  constructor(
    public vibrant: string,
    public dark: string,
    public muted: string,
    black? :string,
    custom? :string

  ){
    this.black = black ?? '#111';
    this.custom = custom ?? '#ffffff';

  }
}
