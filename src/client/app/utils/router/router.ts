import { Block } from '../block.js';
import { Route } from './route.js';

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

    public use(pathname: string, block: Block) {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery,
        });

        this.routes.push(route);

        return this;
    }

    public start() {
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute((event.currentTarget as any).location.pathname);
        };

        this._onRoute(window.location.pathname);
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

    public go(pathname: string) {
        this.history.pushState({}, '', pathname);

        this._onRoute(pathname);
    }

    public back() {
        window.history.back();
    }

    public forward() {
        window.history.forward();
    }

    public getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}
