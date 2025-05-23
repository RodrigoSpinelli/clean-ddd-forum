import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (_question) => {
    return;
  },
};

it('Deve criar uma resposta (create-question)', async () => {
  const sut = new CreateQuestionUseCase(fakeQuestionsRepository);

  const { question } = await sut.execute({
    title: 'Nova pergunta',
    content: 'Conteúdo da pergunta',
    authorId: '1',
  });

  expect(question.id).toBeTruthy();
});
