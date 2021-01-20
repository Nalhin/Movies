export abstract class AppUser {
  protected constructor(readonly username: string, readonly id: number) {}

  abstract get isAuthenticated(): boolean;
}

export class AuthenticatedUser extends AppUser {
  constructor(username: string, id: number) {
    super(username, id);
  }

  get isAuthenticated(): boolean {
    return true;
  }
}

export class AnonymousUser extends AppUser {
  constructor() {
    super('', null as number);
  }

  get isAuthenticated(): boolean {
    return false;
  }
}
