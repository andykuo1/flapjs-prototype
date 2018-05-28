//Input
const SUBMIT_KEY = 13; //ENTER
const CLEAR_KEY = 27; //ESCAPE

const STR_TRANSITION_DEFAULT_LABEL = "0";
const STR_TRANSITION_PROXY_LABEL = "#";
const STR_STATE_LABEL = "q";

//Math
const PI2 = Math.PI * 2;
const HALF_PI = Math.PI / 2.0;
const FOURTH_PI = Math.PI / 4.0;
const SIXTH_PI = Math.PI / 6.0;

//Geometry
const NODE_RADIUS = 16;
const NODE_RADIUS_SQU = NODE_RADIUS * NODE_RADIUS;
const NODE_DIAMETER = NODE_RADIUS * 2;
const NODE_RADIUS_INNER = 12;

const EDGE_RADIUS = 12;
const EDGE_RADIUS_SQU = EDGE_RADIUS * EDGE_RADIUS;
const ARROW_WIDTH = 10;
const ENDPOINT_RADIUS = 6;
const ENDPOINT_RADIUS_SQU = ENDPOINT_RADIUS * ENDPOINT_RADIUS;

const HOVER_RADIUS_OFFSET = 4;
const CURSOR_RADIUS = 4;
const CURSOR_RADIUS_SQU = CURSOR_RADIUS * CURSOR_RADIUS;

const SELF_LOOP_HEIGHT = 32;

//Interface
const DOUBLE_TAP_TICKS = 15;
const SPAWN_RADIUS = 64;
const CLICK_RADIUS_SQU = 4;
const PADDING_RADIUS_SQU = 2304;
const PHYSICS_TICKS = 100;

//Colors
const STATE_BASE_COLOR = "#EDEBA6";
const STATE_LINE_COLOR = "black";
const STATE_TEXT_COLOR = "black";
const TRANSITION_COLOR = "black";
const TRANSITION_TEXT_COLOR = "black";
const GRAPH_INFO_COLOR = "lightgray";

//Styling
const NODE_FONT = "12px Arial";
const NODE_TEXT_ALIGN = "center";
const NODE_STROKE_STYLE = STATE_LINE_COLOR;
const NODE_FILL_STYLE = STATE_BASE_COLOR;
const NODE_TEXT_FILL_STYLE = STATE_TEXT_COLOR;

const EDGE_FONT = "12px Arial";
const EDGE_TEXT_ALIGN = "center";
const EDGE_STROKE_STYLE = TRANSITION_COLOR;
const EDGE_TEXT_STROKE_STYLE = TRANSITION_TEXT_COLOR;

const HOVER_STROKE_STYLE = "rgba(0,0,0,0.6)";
const HOVER_LINE_WIDTH = 2;
const HOVER_LINE_DASH = [6, 4];
const HOVER_ANGLE_SPEED = 0.01;

const SELECTION_BOX_SHADOW_COLOR = "black";
const SELECTION_BOX_SHADOW_SIZE = 5;
const SELECTION_BOX_SHADOW_OFFSETX = 2;
const SELECTION_BOX_SHADOW_OFFSETY = 2;
const SELECTION_BOX_FILL_STYLE = "rgba(0, 0, 0, 0.1)";
const SELECTION_BOX_STROKE_STYLE = "black";

//IO
const EXPORT_FILE_NAME = "flap-machine.png";
