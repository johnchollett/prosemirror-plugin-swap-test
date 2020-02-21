const {EditorView} = require("prosemirror-view");
const {EditorState, Plugin, PluginKey} = require("prosemirror-state");
const {MenuItem} = require("prosemirror-menu");
const {exampleSetup, buildMenuItems} = require("prosemirror-example-setup");
const {schema} = require("prosemirror-schema-basic");

const P1 = new Plugin({
  key: new PluginKey("P1"),
  props: {
    attributes: state => ({
      class: "P1"
    }),
    nodeViews: {
      paragraph: (node, view, getPos, decorations) => {
        let paragraphNode = document.createElement("p");
        paragraphNode.classList.add("P1");
        return {
          dom: paragraphNode
        }
      }
    }
  }
});
const P2 = new Plugin({
  key: new PluginKey("P2"),
  props: {
    attributes: state => ({
      class: "P2"
    }),
    nodeViews: {
      paragraph: (node, view, getPos, decorations) => {
        let paragraphNode = document.createElement("p");
        paragraphNode.classList.add("P2");
        return {
          dom: paragraphNode
        }
      }
    }
  }
});

window.$editor = new EditorView(document.getElementById("mount"), {
  state: EditorState.create({
    schema,
    plugins: [P1].concat(exampleSetup({
      schema,
      menuContent: buildMenuItems(schema).fullMenu.concat([[
        new MenuItem({
          run(state, dispatch, view, event) {
            let next = null;
            switch (true) {
              case view.state.plugins.some(p => p === P1):
                next = view.state.reconfigure({
                  plugins: [].concat(view.state.plugins).filter(p => p !== P1).concat(P2)
                });
                break;
              case view.state.plugins.some(p => p === P2):
                next = view.state.reconfigure({
                  plugins: [].concat(view.state.plugins).filter(p => p !== P2).concat(P1)
                });
                break;
              default:
                break;
            }
            next && view.updateState(next);
            view.focus();
          },
          css: "position: relative; top: -1px;",
          title: "Press Me",
          label: "Swap",
          execEvent: "mousedown"
        })
      ]])
    }))
  })
});