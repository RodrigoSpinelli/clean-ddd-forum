import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { faker } from '@faker-js/faker';

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID
) {
  const question = Question.create(
    {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: new UniqueEntityID(),
      ...override,
    },
    id
  );

  return question;
}
