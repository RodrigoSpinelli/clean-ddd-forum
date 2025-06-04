import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-anwser';
import { DeleteAnswerUseCase } from './delete-anwser';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe('Delete-answer use-case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it('Deve deletar uma pergunta (delete-question)', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    );

    inMemoryAnswersRepository.create(newAnswer);

    const { answer } = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    });

    expect(answer.id).toBeTruthy();
    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it('Não deve deletar uma pergunta de outro autor (delete-question)', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    );

    inMemoryAnswersRepository.create(newAnswer);

    await expect(
      sut.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
