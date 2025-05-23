import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Answer } from '@/domain/entities/answer';
import { AnswersRepository } from '@/domain/repositories/answers-repository';

interface AnswerQuestionRequest {
  questionId: string;
  instructorId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  execute({ instructorId, questionId, content }: AnswerQuestionRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId,
    });

    return answer;
  }
}
