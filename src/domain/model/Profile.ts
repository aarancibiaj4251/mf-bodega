export class Profile {
  public id?: string;
  public url?: string;
  public icon?: string;
  public description?: string;
  public general?: string;

  constructor(id: string, url: string, icon: string, description: string, general: string) {
    this.id = id;
    this.url = url;
    this.icon = icon;
    this.description = description;
    this.general = general;
  }
}
