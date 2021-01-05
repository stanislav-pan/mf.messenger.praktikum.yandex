export class HashTable {
  public size: number;
  private memory: Array<Array<unknown>>;

  constructor(size: number) {
    if (!size || size < 0) {
      throw new Error('Размер должен быть положительным числом');
    }

    this.size = size;
    this.memory = [];
  }

  // Добавляет пару [key, value] в хеш-таблицу.
  // Если ключ существует, перезаписывает значение.
  public set(key: string, value: unknown): void {
    const hashValue = this.getHashByKey(key);

    this.memory[hashValue] = this.memory[hashValue] || [];
    this.memory[hashValue].push([key, value]);
  }

  // Возвращает значение в хеш-таблице по ключу.
  // Если ключа нет, возвращает undefined.
  public get(key: string): unknown {
    const hashValue = this.getHashByKey(key);
    const table = this.memory[hashValue];

    if (!Array.isArray(table)) {
      return undefined;
    }

    const targetValue = table.find(([itemKey]) => itemKey === key);

    return targetValue ? targetValue[1] : undefined;
  }

  // Удаляет значение из хеш-таблице по ключу.
  public remove(key: string): void {
    const hashValue = this.getHashByKey(key);

    const table = this.memory[hashValue];

    if (!Array.isArray(table)) {
      return;
    }

    this.memory[hashValue] = table.filter(([itemKey]) => itemKey !== key);
  }

  private getHashByKey = (key: string) => hash(key, this.size);
}

// Хеширующая функция.
function hash(key, size) {
  const MAX_LENGTH = 200;

  const start =
    key.length > MAX_LENGTH ? Math.floor((key.length % MAX_LENGTH) / 2) : 0;
  const end = Math.min(key.length, MAX_LENGTH);

  let total = 0;

  for (let i = 0; i < end; i++) {
    const charCode = key.charCodeAt(start + i);
    total = (total + charCode * (i + 1)) % size;
  }

  return total;
}
