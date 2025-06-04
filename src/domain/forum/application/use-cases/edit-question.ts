import { QuestionsRepository } from '../repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

interface EditQuestionRequest {
  questionId: string;
  authorId: string;
  title: string;
  content: string;
}

interface EditQuestionResponse {
  question: Question;
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed');
    }

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);

    return {
      question,
    };
  }
}
