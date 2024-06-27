import {PluginContext} from 'molstar/lib/mol-plugin/context'
import {Canvas3DContext} from 'molstar/lib/mol-canvas3d/canvas3d'
import {AssetManager} from 'molstar/lib/mol-util/assets';
import {DefaultPluginSpec} from "molstar/lib/mol-plugin/spec";

export class EmbeddableMolStar {
  private initDone: () => void = undefined as any;
  initialized = new Promise<void>(res => {
    this.initDone = res;
  })
  context3d: Canvas3DContext = undefined as any;
  pluginContext: PluginContext = undefined as any;
  container: HTMLDivElement = undefined as any;
  canvas: HTMLCanvasElement = undefined as any;

  mount(parent: HTMLElement) {
    parent.appendChild(this.container);
  }

  unmount() {
    this.container.parentElement?.removeChild(this.container);
  }

  async loadData() {
    // loadEmdb(this.pluginContext, 'EMD-8116');
  }


  async init() {
    this.container = document.createElement('div');
    this.canvas = document.createElement('canvas');
    Object.assign(this.container.style, {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    })
    Object.assign(this.canvas.style, {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    })
    this.container.appendChild(this.canvas);
    this.context3d = Canvas3DContext.fromCanvas(this.canvas, new AssetManager());
    this.pluginContext = new PluginContext(DefaultPluginSpec());
    this.pluginContext.initViewer(this.canvas, this.container, this.context3d);
    this.initDone();
  }

}