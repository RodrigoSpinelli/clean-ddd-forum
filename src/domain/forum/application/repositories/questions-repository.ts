import { Question } from '@/domain/forum/enterprise/entities/question';

export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>;
  create(question: Question): Promise<void>;
  delete(question: Question): Promise<void>;
  findById(id: string): Promise<Question | null>;
  save(question: Question): Promise<void>;
}
