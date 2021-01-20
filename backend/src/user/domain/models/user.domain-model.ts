import * as bcrypt from 'bcrypt';

export class User {
  constructor(
    readonly id: number,
    readonly username: string,
    readonly email: string,
    readonly password: string,
  ) {}

  public async hashPassword(): Promise<User> {
    return new User(
      this.id,
      this.username,
      this.email,
      await bcrypt.hash(this.password, 10),
    );
  }

  public canLogin(password: string): Promise<boolean> {
    return this.arePasswordsEqual(password);
  }

  private async arePasswordsEqual(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
