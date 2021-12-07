import { Component, Host, h, ComponentInterface, State, Prop, Watch } from '@stencil/core';
import { SidebarData } from '../../utils/data';

@Component({
  tag: 'vis-main-sidebar',
  styleUrl: 'vis-main-sidebar.css',
  shadow: true,
})
export class VisMainSidebar implements ComponentInterface {

  static readonly TAG_NAME = 'vis-main-sidebar';

  private chartsContainerElement: HTMLDivElement;

  @Prop() data: SidebarData;

  @Watch('data')
  dataChanged(data: SidebarData) {
    this.updatePlugins(data);
    if (data.selectedId) {
      this.collapsed = false;
    }
  }

  @State() collapsed = true;

  componentDidRender() {
    this.updatePlugins(this.data);
  }

  render() {
    return (
      <Host>
        <div id="left-section">
          <button
            id="collapse-toggle-button"
            onClick={() => this.collapsed = !this.collapsed}
          >&#9776;</button>
        </div>
        <div id="right-section" class={this.collapsed ? 'collapsed' : ''}>
          <span id="header">Info for {this.data.selectedId || 'no selected ID'}</span>
          <div id="charts-container" ref={el => this.chartsContainerElement = el}></div>
        </div>
      </Host>
    );
  }

  private updatePlugins(data: SidebarData) {
    this.chartsContainerElement.innerHTML = '';
    data.plugins?.forEach(plugin => {
      const pluginElement = document.createElement(plugin.tagName);
      (pluginElement as any).data = data.selectedId;
      this.chartsContainerElement.appendChild(pluginElement);
    });
  }

}
