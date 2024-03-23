export class CreateRecipeCommand {
  public readonly Id: string;
  public readonly StartedCreationAt: Date;

  constructor(public readonly Title: string) {
    this.StartedCreationAt = new Date();
    this.Id = crypto.randomUUID();
  }
}
