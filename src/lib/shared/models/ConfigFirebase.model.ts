export class ConfigFirebaseModel {
  constructor(
    public apiKey: string,
    public appId: string,
    public authDomain: string,
    public messagingSenderId: string,
    public projectId: string,
    public storageBucket: string
  ) {}
}
