import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { DeleteQuestionUseCase } from './delete-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete-question use-case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('Deve deletar uma pergunta (delete-question)', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    );

    inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it('Não deve deletar uma pergunta de outro autor (delete-question)', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    );

    inMemoryQuestionsRepository.create(newQuestion);

    await expect(
      sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
      })
    ).rejects.toThrow(new Error('Not allowed'));
  });
});
