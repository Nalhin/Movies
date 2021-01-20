export interface ExistsByUsernameOrEmailPort {
  existsByUsernameOrEmail(username: string, email: string): Promise<boolean>;
}

export const EXISTS_BY_USERNAME_OR_EMAIL_PORT = Symbol(
  'EXISTS_BY_USERNAME_OR_EMAIL_PORT',
);
