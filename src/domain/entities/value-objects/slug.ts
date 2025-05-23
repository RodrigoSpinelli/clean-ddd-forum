export class Slug {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * @description Recebe uma string e retorna um slug
   * @param text - {string}
   * @example
   * ```ts
   * const slug = Slug.createFromText("Pergunta Exemplo");
   * console.log(slug.value); // "pergunta-exemplo"
   * ```
   * @returns Uma nova instância de Slug
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '');

    return new Slug(slugText);
  }
}
