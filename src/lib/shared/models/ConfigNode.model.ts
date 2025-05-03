export class ConfigNodeModel {
  constructor(public env: string) {}

  isDevEnv(): boolean {
    return this.env === "development" || this.env === "dev";
  }
}
