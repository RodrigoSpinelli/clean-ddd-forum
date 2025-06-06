import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug);

    return question ?? null;
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id
    );

    this.items.splice(questionIndex, 1);
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id);

    return question ?? null;
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id
    );

    this.items[questionIndex] = question;
  }
}
