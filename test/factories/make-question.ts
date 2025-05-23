import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    title: 'Nova pergunta',
    content: 'Conteúdo da pergunta',
    authorId: new UniqueEntityID(),
    ...override,
  });

  return question;
}
