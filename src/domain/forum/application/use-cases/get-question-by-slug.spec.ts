import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';
import { makeQuestion } from 'test/factories/make-question';
import { Slug } from '../../enterprise/entities/value-objects/slug';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Get-question-by-slug use-case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('Deve obter uma pergunta pelo slug (get-question-by-slug)', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('nova-pergunta'),
    });

    inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: 'nova-pergunta',
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.items[0].id).toBe(question.id);
  });
});
