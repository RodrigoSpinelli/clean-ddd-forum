import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

interface CreateQuestionRequest {
  title: string;
  content: string;
  authorId: string;
}

interface CreateQuestionResponse {
  question: Question;
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    title,
    content,
    authorId,
  }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
    const question = Question.create({
      title,
      content,
      authorId: new UniqueEntityID(authorId),
    });

    await this.questionsRepository.create(question);

    return {
      question,
    };
  }
}
