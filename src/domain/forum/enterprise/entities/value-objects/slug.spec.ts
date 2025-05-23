import { Slug } from './slug';

describe('Slug value object', () => {
  it('deve criar um slug a partir de um texto', () => {
    const slug = Slug.createFromText('Example Question');

    expect(slug.value).toEqual('example-question');
  });
});
