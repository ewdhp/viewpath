import { ref } from 'vue';
import TreeNode from './TreeNode';

export function useViewTree() {
  const root = ref(new TreeNode(1, 'Root', null));

  const path = ref([]);

  const addView = (parentId, name, component, conditions = [], style = {}, script = () => {}, html = '', routeTo = null, props = {}, components = []) => {
    const parent = findNodeById(root.value, parentId);
    if (parent) {
      const newNode = new TreeNode(Date.now(), name, component, conditions, style, script, html, routeTo, props, components);
      parent.addChild(newNode);
    }
  };

  const navigate = (node, context) => {
    if (node.conditions.every(condition => condition(context))) {
      node.script(context);
      return node.component;
    }
    return null;
  };

  const resetPath = () => {
    path.value = [];
  };

  const findNodeById = (node, id) => {
    if (node.id === id) return node;
    for (const child of node.children) {
      const result = findNodeById(child, id);
      if (result) return result;
    }
    return null;
  };

  const findNodeByName = (name) => {
    if(!name) return null;
    const findNode = (node, name) => {
      if (node.name === name) return node;
      for (const child of node.children) {
        const result = findNode(child, name);
        if (result) return result;
      }
      return null;
    };
    return findNode(root.value, name);
  };

  return {
    root,
    path,
    addView,
    navigate,
    resetPath,
    findNodeByName,
  };
}
