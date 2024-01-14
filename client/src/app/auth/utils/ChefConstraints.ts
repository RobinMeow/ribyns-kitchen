export class ChefConstraints {
  static readonly Name = {
    minLength: 3,
    maxLength: 20,
  };
  static readonly Password = {
    minLength: 4,
    maxLength: 50,
  };
  static readonly Email = {
    minLength: 6,
    maxLength: 100,
  };
}
