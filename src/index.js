class RuleSet {
    hook = (node, index, props) => { return {}; };

    constructor(hook) {
        this.hook = hook;
    }
}

class Selector {
    elements = [];
    ruleSets = [];
    query = "";

    constructor(query, state) {
        this.query = query;
    }

    ruleset(hook) {
        let set = new RuleSet(hook);
        this.ruleSets.push(set);

        RSS.update();
    }

    render(props) {
        let all = document.querySelectorAll(this.query);
        for (let i = 0; i < all.length; i++) {
            let node = all[i];

            let style = {};
    
            for (let set of this.ruleSets) {
                let dict = set.hook(node, i, props);
                for (let key in dict) {
                    style[key] = dict[key];
                }
            }
            for (let key in style) {
                node.style[key] = style[key];
            }
        }
    }
}

class RSS {
    static selectors = [];
    static props = {};

    static sayHello(par) {
        console.log("hello", par);
    }

    static update() {
        for (let selector of this.selectors) {
            selector.render(this.props);
        }
    }

    static select(query, state) {
        let selector = new Selector(query, state);
        this.selectors.push(selector);
        return selector;
    }
}

window.addEventListener("load", () => {
    RSS.update();
});

export default RSS;