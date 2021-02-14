import { cloneDeep } from '@my-lodash/clone-deep';

/** Список смежности */
type AdjacencyList = Record<string, string[]>;

export class UndirectedGraph {
  private data: AdjacencyList;

  constructor() {
    this.data = {};
  }

  // Добавляет вершину.
  // Если вершина уже существует, ничего не делает.
  public addVertex(vertex: string): UndirectedGraph {
    if (!(vertex in this.data)) {
      this.data[vertex] = [];
    }

    return this;
  }

  // Удаляет вершину.
  public removeVertex(vertex: string): UndirectedGraph {
    delete this.data[vertex];

    Object.entries(this.data).forEach(([key, edges]) => {
      this.data[key] = edges.filter((edge) => edge !== vertex);
    });

    return this;
  }

  // Добавляет грань между двумя вершинами.
  public addEdge(vertex1: string, vertex2: string): UndirectedGraph {
    if (this.hasVertexes(vertex1, vertex2) && vertex1 !== vertex2) {
      this.data[vertex1] = Array.from(new Set(this.data[vertex1]).add(vertex2));
      this.data[vertex2] = Array.from(new Set(this.data[vertex2]).add(vertex1));
    }

    return this;
  }

  // Удаляет грань между двумя вершинами.
  public removeEdge(vertex1: string, vertex2: string): UndirectedGraph {
    if (this.hasVertexes(vertex1, vertex2)) {
      this.data[vertex1] = this.data[vertex1].filter(
        (edge) => edge !== vertex2
      );
      this.data[vertex2] = this.data[vertex2].filter(
        (edge) => edge !== vertex1
      );
    }

    return this;
  }

  public getData = (): AdjacencyList => cloneDeep(this.data);

  private hasVertexes(...vertexes: string[]): boolean {
    let res = true;

    vertexes.forEach((vertex) => {
      if (vertex in this.data) {
        return;
      }

      res = false;
    });

    return res;
  }
}
