import { AnswerQuestionUseCase } from '@/domain/use-cases/answer-question';
import { AnswersRepository } from '@/domain/repositories/answers-repository';

const fakeAnswersRepository: AnswersRepository = {
  create: async (_answer) => {
    return;
  },
};

it('Deve criar uma resposta (answer-question)', async () => {
  const sut = new AnswerQuestionUseCase(fakeAnswersRepository);

  const answer = await sut.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  });

  expect(answer.content).toEqual('Nova resposta');
});
