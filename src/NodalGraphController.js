import { Edge } from 'NodalGraph.js';
import NodalGraphRenderer from 'NodalGraphRenderer.js';
import NodalGraphSorter from 'NodalGraphSorter.js';

class NodalGraphController
{
  constructor(canvas, mouse, graph)
  {
    this.canvas = canvas;
    this.mouse = mouse;
    this.graph = graph;

    this.targetSource = null;
    this.targetDestination = null;
    this.prevMouse = { x: 0, y: 0 };

    this.moveTarget = null;
    this.moveGraph = null;
    this.selectorAngle = 0;
    this.selectEdge = new Edge(null, null, "");
  }

  load()
  {
    this.mouse.on('mousedown', (mouse, button) => {
      if (button == 3)
      {
        //Move target?
        this.startMove(mouse.x, mouse.y);
      }
      else
      {
        this.markTarget(mouse.x, mouse.y);
      }
      this.prevMouse.x = mouse.x;
      this.prevMouse.y = mouse.y;
    });
    this.mouse.on('mouseup', (mouse, button) => {
      if (button == 3)
      {
        //Finish moving target?
        this.endMove(mouse.x, mouse.y);
      }
      else
      {
        this.releaseTarget(mouse.x, mouse.y);
      }
      this.prevMouse.x = mouse.x;
      this.prevMouse.y = mouse.y;
    });

    //Setup buttons
    const buttonNewState = document.getElementById("new_state");
    buttonNewState.addEventListener('click', (event) => {
      //Create new state
      this.createNewState();
    });
    const buttonClearGraph = document.getElementById("clear_graph");
    buttonClearGraph.addEventListener('click', (event) => {
      //Clear graph
      this.graph.clear();
    });
    const buttonSimulatePhysics = document.getElementById("simulate_physics");
    buttonSimulatePhysics.addEventListener('click', (event) => {
      //Begin to simulate physics for graph...
      NodalGraphSorter.sort();
    });
    const buttonExportImage = document.getElementById("export_image");
    buttonExportImage.addEventListener('click', (event) => {
      //Export canvas to png image
      const dataURL = this.canvas.toDataURL("image/png");
      download(dataURL, EXPORT_FILE_NAME, "image/png");
    });
  }

  draw(ctx, dt)
  {
    //TODO: Drawing the graph info...

    //Get hover information...
    let selectState = this.getStateByPosition(this.mouse.x, this.mouse.y);

    //Whether or not cursor has left the node to signify edge drawing...
    if (this.targetSource != null)
    {
      if (this.isSelfMode && selectState != this.targetSource)
      {
        this.isSelfMode = false;
      }

      if (!this.isSelfMode)
      {
        this.targetDestination = selectState;
      }
    }

    //Draw the edge if moving edge...
    if (this.targetSource != null && !this.isSelfMode)
    {
      this.selectEdge.from = this.targetSource;
      this.selectEdge.to = this.targetDestination || this.mouse;
      if (this.targetSource == this.targetDestination)
      {
        this.selectEdge.y = this.selectEdge.from.y - SELF_LOOP_HEIGHT;
      }
      //TODO: if (this.getEdgesByNodes(this.targetSource, this.targetDestination) != null)
      else
      {
        this.selectEdge.quad = null;
      }
      NodalGraphRenderer.drawEdges(ctx, this.selectEdge);
    }

    //Move the target if dragging object...
    if (this.moveTarget != null)
    {
      //Readjust for graph offset (1/2)...
      if (this.moveTarget instanceof Edge)
      {
        this.moveTarget.x = this.mouse.x;
        this.moveTarget.y = this.mouse.y;
      }
      else
      {
        this.moveTarget.x = this.mouse.x - this.graph.centerX;
        this.moveTarget.y = this.mouse.y - this.graph.centerY;
      }
      selectState = this.moveTarget;
    }

    //Move the graph if draggin empty...
    if (this.moveGraph != null)
    {
      this.graph.offsetX = this.mouse.x - this.moveGraph.x;
      this.graph.offsetY = this.mouse.y - this.moveGraph.y;
    }

    //Hover information...
    if (selectState == null) selectState = this.getEdgeByPosition(this.mouse.x, this.mouse.y);
    if (selectState != null)
    {
      NodalGraphRenderer.drawHoverCircle(ctx, selectState.x, selectState.y, NODE_RADIUS + 4);
    }
  }

  createNewState()
  {
    const x = (Math.random() * SPAWN_RADIUS * 2) - SPAWN_RADIUS;
    const y = (Math.random() * SPAWN_RADIUS * 2) - SPAWN_RADIUS;
    const node = this.graph.createNewNode();
    node.x = x;
    node.y = y;
    node.accept = false;
    return node;
  }

  createNewTransition(src, dst)
  {
    const edge = this.graph.createNewEdge(src, dst);
    edge.label = "0";
    return edge;
  }

  markTarget(x, y)
  {
    this.targetSource = this.getStateByPosition(x, y);
    this.isSelfMode = true;
  }

  releaseTarget(x, y)
  {
    //If did not click on anything...
    if (this.targetSource == null)
    {
      //If click, create node at mouse position...
      const dx = x - this.prevMouse.x;
      const dy = y - this.prevMouse.y;

      //Check if it is a click, not a drag...
      if (dx * dx + dy * dy < CLICK_RADIUS_SQU)
      {
        const node = this.graph.createNewNode();
        node.x = x - this.graph.centerX;
        node.y = y - this.graph.centerY;
        node.accept = false;
      }
      return;
    }

    const target = this.getStateByPosition(x, y);
    if (!this.isSelfMode && this.targetDestination != null)
    {
      this.createNewTransition(this.targetSource, this.targetDestination);
    }
    else if (target == this.targetSource)
    {
      this.graph.toggleAcceptState(target);
    }

    this.targetSource = null;
    this.targetDestination = null;
  }

  startMove(x, y)
  {
    this.moveTarget = this.getEdgeByPosition(x, y) || this.getStateByPosition(x, y);
    if (this.moveTarget == null)
    {
      this.moveGraph = { x: this.mouse.x, y: this.mouse.y };
    }
  }

  endMove(x, y)
  {
    if (this.moveTarget != null)
    {
      //Readjust for graph offset (2/2)...
      if (this.moveTarget instanceof Edge)
      {
        this.moveTarget.x = this.mouse.x;
        this.moveTarget.y = this.mouse.y;
      }
      else
      {
        this.moveTarget.x = this.mouse.x - this.graph.centerX;
        this.moveTarget.y = this.mouse.y - this.graph.centerY;
      }

      this.moveTarget = null;
    }

    if (this.moveGraph != null)
    {
      this.graph.offsetX = this.mouse.x - this.moveGraph.x;
      this.graph.offsetY = this.mouse.y - this.moveGraph.y;

      //TODO: Limit how far you can move the graph...

      this.moveGraph = null;
    }
  }

  getStateByPosition(x, y)
  {
    for(const node of this.graph.nodes)
    {
      const dx = x - node.x;
      const dy = y - node.y;
      if (dx * dx + dy * dy < RADIUS_SQU)
      {
        return node;
      }
    }

    return null;
  }

  getEdgeByPosition(x, y)
  {
    for(const edge of this.graph.edges)
    {
      const dx = x - edge.x;
      const dy = y - edge.y;
      if (dx * dx + dy * dy < EDGE_RADIUS_SQU)
      {
        return edge;
      }
    }

    return null;
  }
}

export default NodalGraphController;
