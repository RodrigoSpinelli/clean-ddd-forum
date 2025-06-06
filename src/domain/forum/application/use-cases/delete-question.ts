import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

interface DeleteQuestionRequest {
  questionId: string;
  authorId: string;
}

interface DeleteQuestionResponse {
  question: Question;
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
  }: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed');
    }

    await this.questionsRepository.delete(question);

    return {
      question,
    };
  }
}
