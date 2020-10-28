import { MapOfBlockLike } from './block.js';

export class ComponentsRenderer {
    public static render<T extends MapOfBlockLike>(
        components: T
    ): { [key: string]: string } {
        return Object.entries(components).reduce((acc, [key, value]) => {
            acc[key] = value.render();

            return acc;
        }, {});
    }
}
