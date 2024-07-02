import {uniqueId} from "./utils";

/**
 * Private class
 */
class MyInstance {
    private id: string;
    private options: { el?: HTMLElement, [key: string]: any };

    constructor(options: { [key: string]: any }) {
        this.id = uniqueId();
        this.options = {
            el: undefined,
            ...options
        };

        if (this.options.el) {
            this.options.el.innerHTML = 'Hello!';
        }
    }
}

/**
 * Private class Controller
 * This class will hold instances of the library's objects
 */
class Controller {
    private instances: MyInstance[];

    constructor() {
        this.instances = [];
    }

    add(instance: MyInstance): void {
        this.instances.push(instance);
    }

    get(id: string): MyInstance | undefined {
        return this.instances.find(instance => instance['id'] === id);
    }
}

// Extend the Window interface to include MyInstanceController and MyInstance
declare global {
    interface Window {
        MyInstanceController: Controller;
        MyInstance: {
            init: (options?: { [key: string]: any }) => void;
            get: (id: string) => MyInstance | undefined;
        };
    }
}

/**
 * Public library data
 * access via window.MyInstanceController
 */
window.MyInstanceController = new Controller();

/**
 * Public library object
 * access via window.MyInstance
 */
window.MyInstance = {
    // init new instances
    init: (options: { [key: string]: any } = {}) => {
        const selector: string = options.selector;

        // init with selector
        document.querySelectorAll<HTMLElement>(selector).forEach(el => {
            window.MyInstanceController.add(new MyInstance({el, ...options}));
        });
    },
    // Get instance object by ID
    get: (id: string): MyInstance | undefined => window.MyInstanceController.get(id)
};

window.MyInstance.init();