import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let inMemoryAnwsersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Answer-question use-case', () => {
  beforeEach(() => {
    inMemoryAnwsersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnwsersRepository);
  });

  it('Deve criar uma resposta (answer-question)', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta',
    });

    expect(answer.id).toBeTruthy();
    expect(inMemoryAnwsersRepository.items[0].id).toBe(answer.id);
  });
});
