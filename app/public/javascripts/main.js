function TransfuseGraph (options) {
  var private = "private";
  this.public = "public"
  this.graph = new joint.dia.Graph;
  var paper = new joint.dia.Paper({
    el: $(options.el),
    width: 1000,
    height: 900,
    model: this.graph,
    interactive: true,
    gridSize: 1
  });
  this.links = [];
  this.shapes = {};
  this.elements = [];

  var createLink = function(fromElm, toElm) {
    var link = new joint.dia.Link({
      source: { id: fromElm.id },
      target: { id: toElm.id }
    });
    // set link props
    link.attr({
      '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
    });
    return link;
  };

  var changeText = function(elm, text){
    // break text for the element
    text = joint.util.breakText(text, {
      width: elm.attributes.size.width
    });
    //elm.attributes.attrs.text.text = text;
    elm.attr({
      'text': {
        'text': text
      }
    });
  };

  this.shapes.entrance = new joint.shapes.basic.Rect({
    position: { x: 100, y: 30 },
    size: { width: 150, height: 50 },
    attrs: {
      rect: { fill: '#D8E0F2', rx: 5, ry: 5, 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'my label', fill: '#464646', 'font-size': 11, 'font-weight': 'bold', 'font-variant': 'small-caps', 'text-transform': 'capitalize'
      }
    }
  });

  this.shapes.treatment = new joint.shapes.basic.Rect({
    position: { x: 200, y: 130 },
    size: { width: 120, height: 50 },
    attrs: {
      rect: { fill: '#E3D1EA', rx: 5, ry: 5, 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'my label', fill: '#464646', 'font-size': 12, 'font-weight': 'bold', 'font-variant': 'small-caps', 'text-transform': 'capitalize'
      }
    }
  });

  this.shapes.action = new joint.shapes.basic.Rect({
    position: { x: 200, y: 130 },
    size: { width: 150, height: 50 },
    attrs: {
      rect: { fill: '#C9F0CB', rx: 5, ry: 5, 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'my label', fill: '#464646', 'font-size': 12, 'font-weight': 'bold', 'font-variant': 'small-caps', 'text-transform': 'capitalize'
      }
    }
  });

  this.shapes.decision = new joint.shapes.basic.Path({
    position: { x: 200, y: 130 },
    size: { width: 100, height: 100 },
    attrs: {
      path: { fill: '#EEDDB0', rx: 0, ry: 0, 'stroke-width': 1, stroke: 'black', d: 'M 30 0 L 60 30 30 60 0 30 z' },
      text: {
        text: 'my label', fill: '#464646', 'font-size': 11, 'font-weight': 'bold', 'font-variant': 'small-caps', 'text-transform': 'capitalize', 'ref-y': 0.45
      }
    }
  });

  var step1 = this.shapes.entrance.clone();
  changeText(step1, "Excessive microvascular bleeding in surgical field");
  //step1.attributes.attrs.text.text = "Excessive microvascular bleeding in surgical field";
  step1.set('position', { x: 300 ,y: 30 });
  this.elements.push(step1);

  var action1 = this.shapes.action.clone();
  changeText(action1, "Order coagulation and platelet tests");
  action1.set('position', { x: 300 ,y: 135 });
  this.elements.push(action1);

  this.pltLevel = this.shapes.decision.clone();
  changeText(this.pltLevel, "PLT <102 k/mm^3");
  this.pltLevel.set('position', { x: 0 ,y: 300 });
  this.elements.push(this.pltLevel);

  this.tegLevel = this.shapes.decision.clone();
  changeText(this.tegLevel, "TEG MA <48mm");
  this.tegLevel.set('position', { x: 125, y: 300 });
  this.elements.push(this.tegLevel);

  var ptLevel = this.shapes.decision.clone();
  changeText(ptLevel, "PT >16.6 (1.6) sec");
  ptLevel.set('position', { x: 250, y: 300 });
  this.elements.push(ptLevel);

  var aPTTLevel = this.shapes.decision.clone();
  changeText(aPTTLevel, "aPTT >57 sec");
  aPTTLevel.set('position', { x: 375, y: 300 });
  this.elements.push(aPTTLevel);

  var fibrinogenLevel = this.shapes.decision.clone();
  changeText(fibrinogenLevel, "Fibrinogen <140 mg/dL");
  fibrinogenLevel.set('position', { x: 500, y: 300 });
  this.elements.push(fibrinogenLevel);

  var actLevel = this.shapes.decision.clone();
  changeText(actLevel, "ACT > Baseline");
  actLevel.set('position', { x: 625, y: 300 });
  this.elements.push(actLevel);

  var normalLevel = this.shapes.decision.clone();
  changeText(normalLevel, "All normal");
  normalLevel.set('position', { x: 750, y: 300 });
  this.elements.push(normalLevel);

  var plateletTransfusion = this.shapes.treatment.clone();
  changeText(plateletTransfusion, "Platelet transfusion");
  plateletTransfusion.set('position', { x: 50 ,y: 500 });
  this.elements.push(plateletTransfusion);

  var freshTransfusion = this.shapes.treatment.clone();
  changeText(freshTransfusion, "Fresh frozen plasma transfusion");
  freshTransfusion.set('position', { x: 300 ,y: 500 });
  this.elements.push(freshTransfusion);

  var cryoTransfusion = this.shapes.treatment.clone();
  changeText(cryoTransfusion, "Cryoprecipitate transfusion");
  cryoTransfusion.set('position', { x: 490 ,y: 500 });
  this.elements.push(cryoTransfusion);

  var protamine = this.shapes.treatment.clone();
  changeText(protamine, "Protamine");
  protamine.set('position', { x: 615 ,y: 500 });
  this.elements.push(protamine);

  var surgicalExploration = this.shapes.treatment.clone();
  changeText(surgicalExploration, "Surgical re-exploration of chest");
  surgicalExploration.set('position', { x: 740 ,y: 500 });
  this.elements.push(surgicalExploration);

  this.links.push(createLink(step1, action1));
  this.links.push(createLink(action1, this.pltLevel));
  this.links.push(createLink(action1, this.tegLevel));
  this.links.push(createLink(action1, ptLevel));
  this.links.push(createLink(action1, aPTTLevel));
  this.links.push(createLink(action1, fibrinogenLevel));
  this.links.push(createLink(action1, actLevel));
  this.links.push(createLink(action1, normalLevel));

  this.links.push(createLink(this.pltLevel, plateletTransfusion));
  this.links.push(createLink(this.tegLevel, plateletTransfusion));
  this.links.push(createLink(ptLevel, freshTransfusion));
  this.links.push(createLink(aPTTLevel, freshTransfusion));
  this.links.push(createLink(fibrinogenLevel, cryoTransfusion));
  this.links.push(createLink(actLevel, protamine));
  this.links.push(createLink(normalLevel, surgicalExploration));

  //var link = new joint.dia.Link({
  //  source: { id: step1.id },
  //  target: { id: action1.id }
  //});

  this.graph.addCells(this.elements);
  this.graph.addCells(this.links);

}

TransfuseGraph.prototype.resetHighlight = function resetPath () {
  // reset all the links
  this.links.forEach(function(link){
    link.attr({
      '.connection': { stroke: 'black' },
      '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
    });
  });
  this.elements.forEach(function(element){
    // check if it is a path element vs regular rect element
    if (element.attributes.attrs.path){
      element.attr({
        path: {
          stroke: 'black',
          'stroke-width': 1
        }
      });
    } else {
      element.attr({
        rect: {
          stroke: 'black',
          'stroke-width': 1
        }
      });
    }
  });
  // reset all the elements
  //
};

TransfuseGraph.prototype.highlightPath = function highlightPath (inputs) {
  // path name to highlight
  var pathName = '';
  // first reset old paths
  this.resetHighlight();
  if (inputs.pltLevel < 102){
    // highlight pltDecisionPath
    pathName = 'pltLevel';
  } else if (inputs.tegLevel < 48) {
    // highlight pltDecisionPath
    pathName = 'tegLevel';
  }
  // make sure we have a path before highlighting, if we have no path, skip this
  if (pathName) {
    var connectedLinks = this.graph.getConnectedLinks(this[pathName], { deep: true });
    // change color of connecting links
    connectedLinks.forEach(function(link){
      link.attr({
        '.connection': { stroke: 'red' },
        '.marker-target': { fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z' }
      });
    });
    // change color of decision block
    this[pathName].attr({
      path: {
        stroke: 'red',
        'stroke-width': 3
      }
    });
    // change color of any connecting elements
    var connectedElems = this.graph.getNeighbors(this[pathName]);
    connectedElems.forEach(function(element){
      element.attr({
        rect: {
          stroke: 'red',
          'stroke-width': 3
        }
      });
    });
  }
};
//TransfuseGraph.prototype.logger = function logger() {
//  console.log(this.public);
//};
var graph = new TransfuseGraph({
  el: '#myholder',
});

// get the inputs from the fields and put them into the correct var
var inputs = {
  get levels () {
    var levels = {};
    var ids = ['pltLevel', 'tegLevel'];
    ids.forEach(function(id){
      // get the element
      var level = $('#'+id).val();
      if (level === "") {
        // nothing set in level, set to undefined for the return
        levels[id] = undefined;
      } else {
        // otherwise return the number
        levels[id] = Number(level);
      }
    });
    return levels;
  }
};
// listen to changes on any of the fields
//
$("#inputHolder").find("input").focusout(function(elem){
  // everytime something changes, perform the calculation/highlighting
  graph.highlightPath(inputs.levels);
});

//graph.highlightPath(inputs);
