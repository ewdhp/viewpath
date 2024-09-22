<template>
  <div :style="currentStyle">
    <nav>
      <ul>
        <li v-for="(step, index) in path" :key="index">{{ step }}</li>
      </ul>
    </nav>
    <div v-html="currentHtml"></div> <!-- Ensure custom HTML is rendered -->
    <div>
      <component 
        v-for="(comp, index) in currentComponents" 
        :is="comp.name" 
        :key="index" 
        v-bind="comp.props" 
        @navigate="navigateToNext"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useViewTree } from './useViewTree';
import BaseComponent from './BaseComponent.vue';
import NextButton from './NextButton.vue';
import MessageComponent from './MessageComponent.vue';

export default {
  components: {
    BaseComponent,
    NextButton,
    MessageComponent,
  },
  setup() {
    const { root, path, addView, navigate, resetPath, findNodeByName } = useViewTree();
    const currentNode = ref(root.value);
    const currentViewComponent = ref(null);
    const currentProps = ref({});
    const currentHtml = ref('<div><p>Default layout content</p></div>');
    const currentComponents = ref([]);
    const nextNode = ref(null);

    const navigateTo = (node) => {
      const context = { isLoggedIn: true }; // Example context
      const component = navigate(node, context);
      if (component) {
        currentNode.value = node;
        currentViewComponent.value = component;
        currentProps.value = node.props || {};
        currentHtml.value = node.html || '<div><p>Default layout content</p></div>';
        currentComponents.value = node.components || [];
        nextNode.value = node.routeTo ? findNodeByName(node.routeTo) : null;
      } else {
        console.error(`Navigation to ${node.name} failed due to unmet conditions`);
      }
    };

    const navigateToNext = () => {
      if (nextNode.value) {
        navigateTo(nextNode.value);
      } else {
        console.error('No next node to navigate to');
      }
    };

    const currentStyle = computed(() => {
      return currentNode.value.style || {
        /* default styles */
        padding: '20px',
        backgroundColor: '#f0f0f0',
      };
    });

    // Adding views to the tree
    addView(1, 'View 1', 'ViewComponent1', [], { backgroundColor: '#ffcccc' }, (params) => {
      console.log('Script for View 1', params);
    }, '<div><h3>Custom HTML for View 1</h3><p>This is some custom content for View 1.</p></div>', 'View 3', {}, [
      { name: 'NextButton', props: {} },
      { name: 'MessageComponent', props: { message: 'Hello from View 1!' } }
    ]);
    addView(1, 'View 2', 'ViewComponent2', [(context) => context.isLoggedIn], { backgroundColor: '#ccffcc' }, (params) => {
      console.log('Script for View 2', params);
    }, '<div><h3>Custom HTML for View 2</h3><p>This is some custom content for View 2.</p></div>', 'View 3', {}, [
      { name: 'NextButton', props: {} },
      { name: 'MessageComponent', props: { message: 'Hello from View 2!' } }
    ]);
    addView(1, 'View 3', 'ViewComponent3', [], { backgroundColor: '#ccccff' }, (params) => {
      console.log('Script for View 3', params);
    }, '<div><h3>Custom HTML for View 3</h3><p>This is some custom content for View 3.</p></div>', 'View 1', {}, [
      { name: 'NextButton', props: {} },
      { name: 'MessageComponent', props: { message: 'Hello from View 3!' } }
    ]);

    // Initialize the first view
    navigateTo(root.value.children[0]);

    return {
      currentNode,
      currentViewComponent,
      currentProps,
      navigateTo,
      navigateToNext,
      path,
      currentStyle,
      currentHtml,
      currentComponents,
      nextNode,
      findNodeByName,
    };
  },
};
</script>

<style>
/* Default styles */
div {
  padding: 20px;
  background-color: #f0f0f0;
}
</style>
