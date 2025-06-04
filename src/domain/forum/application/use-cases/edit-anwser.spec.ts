import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-anwser';
import { EditAnswerUseCase } from './edit-anwser';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit-answer use-case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it('Deve editar uma resposta (edit-answer)', async () => {
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
      content: 'Novo conteúdo',
    });

    expect(answer.id).toBeTruthy();
    expect(answer.content).toBe('Novo conteúdo');
  });

  it('Não deve editar uma resposta de outro autor (edit-answer)', async () => {
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
        content: 'Novo conteúdo',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
