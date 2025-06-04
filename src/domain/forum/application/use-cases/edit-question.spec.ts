import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';
import { EditQuestionUseCase } from './edit-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit-question use-case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('Deve editar uma pergunta (edit-question)', async () => {
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
      title: 'Novo título',
      content: 'Novo conteúdo',
    });

    expect(question.id).toBeTruthy();
    expect(question.title).toBe('Novo título');
    expect(question.content).toBe('Novo conteúdo');
  });

  it('Não deve editar uma pergunta de outro autor (edit-question)', async () => {
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
        title: 'Novo título',
        content: 'Novo conteúdo',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
