export class MovieCastReadModel {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly character: string,
    readonly profilePath: string,
  ) {}
}
