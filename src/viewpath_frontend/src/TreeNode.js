class TreeNode {
  constructor(id, name, component, conditions = [], style = {}, script = () => {}, html = '', routeTo = null, props = {}, components = []) {
    this.id = id;
    this.name = name;
    this.component = component;
    this.conditions = conditions;
    this.style = style;
    this.script = script;
    this.html = html;
    this.routeTo = routeTo;
    this.props = props;
    this.components = components;
    this.children = [];
  }

  addChild(childNode) {
    this.children.push(childNode);
  }
}

export default TreeNode;
