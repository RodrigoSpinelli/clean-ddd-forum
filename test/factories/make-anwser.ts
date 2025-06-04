import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { faker } from '@faker-js/faker';

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID
) {
  const answer = Answer.create(
    {
      content: faker.lorem.paragraph(),
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      ...override,
    },
    id
  );

  return answer;
}
