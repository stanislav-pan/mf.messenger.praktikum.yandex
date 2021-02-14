import { UndirectedGraph } from '.';

describe('Тестирование класса UndirectedGraph', () => {
  let undirectedGraph: UndirectedGraph;

  beforeEach(() => {
    undirectedGraph = new UndirectedGraph();
  });

  it('Функции объекта должны отрабатывать корректно', () => {
    undirectedGraph
      .addVertex('A')
      .addVertex('B')
      .addVertex('C')
      .addVertex('D')
      .addEdge('A', 'B')
      .addEdge('A', 'B')
      .addEdge('A', 'C');

    expect(undirectedGraph.getData()).toEqual({
      A: ['B', 'C'],
      B: ['A'],
      C: ['A'],
      D: [],
    });
  });
});
