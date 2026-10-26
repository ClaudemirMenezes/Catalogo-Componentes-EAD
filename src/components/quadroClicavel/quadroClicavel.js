
/* Subcomponente: painel */
const TabPanel = {
  props: { content: { type: String, required: true } },
  template: `
    <div class="TabPanel">
      <p>{{ content }}</p>
    </div>
  `
};

/* Subcomponente: aba */
const Tab = {
  props: {
    text: { type: String, required: true },
    isSelected: { type: Boolean, required: true },
    index: { type: Number, required: true },
    setCurrentTab: { type: Function, required: true }
  },
  methods: {
    handleClick() {
      this.setCurrentTab(this.index);
    }
  },
  template: `
    <li 
      :class="['Tab', { 'is-selected': isSelected, 'not-selected': !isSelected }]" 
      @click="handleClick">
      {{ text }}
    </li>
  `
};

/* Componente principal */
export default {
  name: "TabContainer",
  props: {
    defaultTab: { type: Number, default: 0 },
    tabData: { type: Array, required: true }
  },
  data() {
    return {
      currentTab: this.defaultTab
    };
  },
  methods: {
    setCurrentTab(currentTab) {
      if (this.currentTab !== currentTab) {
        this.currentTab = currentTab;
      }
    },
    renderTabs() {
      return this.tabData.map((tab, index) => ({
        index,
        text: tab.name,
        isSelected: this.currentTab === index,
        setCurrentTab: this.setCurrentTab
      }));
    },
    renderTabPanel() {
      return this.tabData[this.currentTab].content;
    }
  },
  components: { TabPanel, Tab },

  template: `
  <div class="TabContainer-box">
    <div class="TabContainer">
      <ul class="Tabs">
        <Tab
          v-for="(tab, index) in renderTabs()"
          :key="index"
          :index="tab.index"
          :text="tab.text"
          :isSelected="tab.isSelected"
          :setCurrentTab="tab.setCurrentTab"
        />
      </ul>
      <TabPanel :content="renderTabPanel()" />
    </div>
  </div>
  `
}