interface PageInfo {
  totalPages: number;
  page: number;
}

export class PaginatedReadModel<T> {
  readonly page: number;
  readonly totalPages: number;
  readonly data: T;

  constructor(data: T, pageInfo: PageInfo) {
    this.data = data;
    this.page = pageInfo.page;
    this.totalPages = pageInfo.totalPages;
  }

  get hasNextPage() {
    return this.page < this.totalPages;
  }
}
