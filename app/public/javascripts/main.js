var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
  el: $('#myholder'),
  width: 600,
  height: 800,
  model: graph,
  interactive: true,
  gridSize: 1
});

var erd = joint.shapes.erd;

var element = function(elm, x, y, label) {
  var cell = new elm({ position: { x: x, y: y }, attrs: { text: { text: label }}});
  graph.addCell(cell);
  return cell;
};

var link = function(elm1, elm2) {
  var myLink = new erd.Line({ source: { id: elm1.id }, target: { id: elm2.id }});
  graph.addCell(myLink);
  return myLink;
};

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

var shapes = {};

shapes.entrance = new joint.shapes.basic.Rect({
  position: { x: 100, y: 30 },
  size: { width: 200, height: 50 },
  attrs: {
    rect: { fill: '#2C3E50', rx: 5, ry: 5, 'stroke-width': 2, stroke: 'black' },
    text: {
      text: 'my label', fill: '#3498DB', 'font-size': 10, 'font-weight': 'bold', 'font-variant': 'small-caps', 'text-transform': 'capitalize'
    }
  }
});

shapes.action = new joint.shapes.basic.Rect({
  position: { x: 200, y: 130 },
  size: { width: 200, height: 50 },
  attrs: {
    rect: { fill: '#4750E4', rx: 5, ry: 5, 'stroke-width': 2, stroke: 'black' },
    text: {
      text: 'my label', fill: '#D8DAF3', 'font-size': 10, 'font-weight': 'bold', 'font-variant': 'small-caps', 'text-transform': 'capitalize'
    }
  }
});

shapes.decision = new joint.shapes.basic.Path({
  position: { x: 200, y: 130 },
  size: { width: 100, height: 100 },
  attrs: {
    path: { fill: '#477A6F', rx: 0, ry: 0, 'stroke-width': 2, stroke: 'black', d: 'M 30 0 L 60 30 30 60 0 30 z' },
    text: {
      text: 'my label', fill: '#D8DAF3', 'font-size': 10, 'font-weight': 'bold', 'font-variant': 'small-caps', 'text-transform': 'capitalize', 'ref-y': 0.45
    }
  }
});

//var employee = element(erd.Entity, 100, 200, "Employee");
//var salesman = element(erd.Entity, 100, 400, "Salesman");
//var wage = element(erd.WeakEntity, 530, 200, "Wage");
//var paid = element(erd.IdentifyingRelationship, 350, 190, "gets paid");
//var isa = element(erd.ISA, 125, 300, "ISA");
//var number = element(erd.Key, 0, 90, "number");
//var nameEl = element(erd.Normal, 75, 30, "name");
//var skills = element(erd.Multivalued, 150, 90, "skills");
//var amount = element(erd.Derived, 440, 80, "amount");
//var date = element(erd.Normal, 590, 80, "date");
//var plate = element(erd.Key, 405, 500, "plate");
//var car = element(erd.Entity, 430, 400, "Company car");
//var uses = element(erd.Relationship, 300, 390, "uses");
//
//link(employee, paid).cardinality('1');
//link(employee, number);
//link(employee, nameEl);
//link(employee, skills);
//link(employee, isa);
//link(isa, salesman);
//link(salesman, uses).cardinality('0..1');;
//link(car, uses).cardinality('1..1');
//link(car, plate);
//link(wage, paid).cardinality('N');
//link(wage, amount);
//link(wage, date);
//

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

var step1 = shapes.entrance.clone();
changeText(step1, "Excessive microvascular bleeding in surgical field");
//step1.attributes.attrs.text.text = "Excessive microvascular bleeding in surgical field";

var action1 = shapes.action.clone();
changeText(action1, "Order coagulation and platelet tests");

var pltLevel = shapes.decision.clone();
changeText(pltLevel, "PLT <102 k/mm^3");

var links = [];
links.push(createLink(step1, action1));
//var link = new joint.dia.Link({
//  source: { id: step1.id },
//  target: { id: action1.id }
//});

graph.addCells([step1, action1, pltLevel]);
graph.addCells(links);
