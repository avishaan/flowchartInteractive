function TransfuseGraph (options) {
  var private = "private";
  this.public = "public"
  var graph = new joint.dia.Graph;
  var paper = new joint.dia.Paper({
    el: $(options.el),
    width: 1000,
    height: 900,
    model: graph,
    interactive: true,
    gridSize: 1
  });
  var links = [];
  var shapes = {};

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


  shapes.entrance = new joint.shapes.basic.Rect({
    position: { x: 100, y: 30 },
    size: { width: 150, height: 50 },
    attrs: {
      rect: { fill: '#D8E0F2', rx: 5, ry: 5, 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'my label', fill: '#464646', 'font-size': 11, 'font-weight': 'bold', 'font-variant': 'small-caps', 'text-transform': 'capitalize'
      }
    }
  });

  shapes.treatment = new joint.shapes.basic.Rect({
    position: { x: 200, y: 130 },
    size: { width: 120, height: 50 },
    attrs: {
      rect: { fill: '#E3D1EA', rx: 5, ry: 5, 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'my label', fill: '#464646', 'font-size': 12, 'font-weight': 'bold', 'font-variant': 'small-caps', 'text-transform': 'capitalize'
      }
    }
  });

  shapes.action = new joint.shapes.basic.Rect({
    position: { x: 200, y: 130 },
    size: { width: 150, height: 50 },
    attrs: {
      rect: { fill: '#C9F0CB', rx: 5, ry: 5, 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'my label', fill: '#464646', 'font-size': 12, 'font-weight': 'bold', 'font-variant': 'small-caps', 'text-transform': 'capitalize'
      }
    }
  });

  shapes.decision = new joint.shapes.basic.Path({
    position: { x: 200, y: 130 },
    size: { width: 100, height: 100 },
    attrs: {
      path: { fill: '#EEDDB0', rx: 0, ry: 0, 'stroke-width': 1, stroke: 'black', d: 'M 30 0 L 60 30 30 60 0 30 z' },
      text: {
        text: 'my label', fill: '#464646', 'font-size': 11, 'font-weight': 'bold', 'font-variant': 'small-caps', 'text-transform': 'capitalize', 'ref-y': 0.45
      }
    }
  });

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

  var cells = [];

  var step1 = shapes.entrance.clone();
  changeText(step1, "Excessive microvascular bleeding in surgical field");
  //step1.attributes.attrs.text.text = "Excessive microvascular bleeding in surgical field";
  step1.set('position', { x: 300 ,y: 30 });
  cells.push(step1);

  var action1 = shapes.action.clone();
  changeText(action1, "Order coagulation and platelet tests");
  action1.set('position', { x: 300 ,y: 135 });
  cells.push(action1);

  var pltLevel = shapes.decision.clone();
  changeText(pltLevel, "PLT <102 k/mm^3");
  pltLevel.set('position', { x: 0 ,y: 300 });
  cells.push(pltLevel);

  var tegLevel = shapes.decision.clone();
  changeText(tegLevel, "TEG MA <48mm");
  tegLevel.set('position', { x: 125, y: 300 });
  cells.push(tegLevel);

  var ptLevel = shapes.decision.clone();
  changeText(ptLevel, "PT >16.6 (1.6) sec");
  ptLevel.set('position', { x: 250, y: 300 });
  cells.push(ptLevel);

  var aPTTLevel = shapes.decision.clone();
  changeText(aPTTLevel, "aPTT >57 sec");
  aPTTLevel.set('position', { x: 375, y: 300 });
  cells.push(aPTTLevel);

  var fibrinogenLevel = shapes.decision.clone();
  changeText(fibrinogenLevel, "Fibrinogen <140 mg/dL");
  fibrinogenLevel.set('position', { x: 500, y: 300 });
  cells.push(fibrinogenLevel);

  var actLevel = shapes.decision.clone();
  changeText(actLevel, "ACT > Baseline");
  actLevel.set('position', { x: 625, y: 300 });
  cells.push(actLevel);

  var normalLevel = shapes.decision.clone();
  changeText(normalLevel, "All normal");
  normalLevel.set('position', { x: 750, y: 300 });
  cells.push(normalLevel);

  var plateletTransfusion = shapes.treatment.clone();
  changeText(plateletTransfusion, "Platelet transfusion");
  plateletTransfusion.set('position', { x: 50 ,y: 500 });
  cells.push(plateletTransfusion);

  var freshTransfusion = shapes.treatment.clone();
  changeText(freshTransfusion, "Fresh frozen plasma transfusion");
  freshTransfusion.set('position', { x: 300 ,y: 500 });
  cells.push(freshTransfusion);

  var cryoTransfusion = shapes.treatment.clone();
  changeText(cryoTransfusion, "Cryoprecipitate transfusion");
  cryoTransfusion.set('position', { x: 490 ,y: 500 });
  cells.push(cryoTransfusion);

  var protamine = shapes.treatment.clone();
  changeText(protamine, "Protamine");
  protamine.set('position', { x: 615 ,y: 500 });
  cells.push(protamine);

  var surgicalExploration = shapes.treatment.clone();
  changeText(surgicalExploration, "Surgical re-exploration of chest");
  surgicalExploration.set('position', { x: 740 ,y: 500 });
  cells.push(surgicalExploration);

  links.push(createLink(step1, action1));
  links.push(createLink(action1, pltLevel));
  links.push(createLink(action1, tegLevel));
  links.push(createLink(action1, ptLevel));
  links.push(createLink(action1, aPTTLevel));
  links.push(createLink(action1, fibrinogenLevel));
  links.push(createLink(action1, actLevel));
  links.push(createLink(action1, normalLevel));

  links.push(createLink(pltLevel, plateletTransfusion));
  links.push(createLink(tegLevel, plateletTransfusion));
  links.push(createLink(ptLevel, freshTransfusion));
  links.push(createLink(aPTTLevel, freshTransfusion));
  links.push(createLink(fibrinogenLevel, cryoTransfusion));
  links.push(createLink(actLevel, protamine));
  links.push(createLink(normalLevel, surgicalExploration));

  //var link = new joint.dia.Link({
  //  source: { id: step1.id },
  //  target: { id: action1.id }
  //});

  graph.addCells(cells);
  graph.addCells(links);

}

TransfuseGraph.prototype.highlightPath = function highlightPath (inputs) {
  // first reset old paths
  if (inputs.pltLevel < 102){
    var connectedLinks = graph.getConnectedLinks(pltLevel, { deep: true });
    // change color of connecting links
    connectedLinks.forEach(function(link){
      link.attr({
        '.connection': { stroke: 'red' },
        '.marker-target': { fill: 'red', d: 'M 10 0 L 0 5 L 10 10 z' }
      });
    });
    // change color of decision block
    pltLevel.attr({
      path: {
        stroke: 'red',
        'stroke-width': 3
      }
    });
    // change color of any connecting elements
    var connectedElems = graph.getNeighbors(pltLevel);
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
var inputs = {};
inputs.pltLevel = function() {
  return $('#pltLevel').val();
};

// listen to changes on any of the fields
$("#inputHolder").find("input").focusout(function(elem){
  // everytime something changes, perform the calculation/highlighting
  highlightPath({
    pltLevel: inputs.pltLevel()
  });
});

graph.highlightPath(inputs);
