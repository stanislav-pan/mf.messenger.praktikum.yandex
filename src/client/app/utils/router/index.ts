import { Block } from '../block';
import { Route } from './route';

export class Router {
  static __instance: Router | undefined;

  public routes: Route[];
  public history: History;

  private _currentRoute: Route | null;
  private _rootQuery: string;

  constructor(rootQuery: string) {
    if (!rootQuery) {
      throw new Error('rootQuery is required');
    }

    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use(pathname: string, block: () => Promise<Block>): this {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery,
    });

    this.routes.push(route);

    return this;
  }

  public start(pathname?: string): void {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this.go(pathname || window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  public go(pathname: string): void {
    this.history.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  public back(): void {
    window.history.back();
  }

  public forward(): void {
    window.history.forward();
  }

  public getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }

  public isAvailableUrl(): boolean {
    if (window.location.pathname === '/') {
      return true;
    }

    return this.routes.some((item) => item.match(window.location.pathname));
  }
}
