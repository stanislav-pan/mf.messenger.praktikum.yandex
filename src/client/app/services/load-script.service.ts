export class LoadScriptService {
    static load(src: string): Promise<boolean> {
        let script = document.createElement('script');
        script.src = src;

        document.head.appendChild(script);

        return new Promise((resolve) => {
            script.onload = function () {
                resolve(true);

                (script as any) = null;
            };
        });
    }
}
