import { PaginatedReadModel } from './paginated.read-model';

describe('PaginatedReadModel', () => {
  describe('hasNextPage()', () => {
    it('should return true when the model has next page', () => {
      const model = new PaginatedReadModel([], { page: 2, totalPages: 3 });

      expect(model.hasNextPage).toBeTrue();
    });

    it('should return false when the model does not have a next page', () => {
      const model = new PaginatedReadModel([], { page: 3, totalPages: 3 });

      expect(model.hasNextPage).toBeFalse();
    });
  });
});
