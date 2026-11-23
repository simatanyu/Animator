//# sourceMappingURL=app.mjs.map
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $lustre from "../lustre/lustre.mjs";
import * as $attr from "../lustre/lustre/attribute.mjs";
import * as $effect from "../lustre/lustre/effect.mjs";
import * as $element from "../lustre/lustre/element.mjs";
import * as $html from "../lustre/lustre/element/html.mjs";
import * as $event from "../lustre/lustre/event.mjs";
import * as $builtins from "./builtins.mjs";
import * as $data from "./data.mjs";
import * as $drawing from "./drawing.mjs";
import * as $editor from "./editor.mjs";
import * as $errors from "./errors.mjs";
import {
  Ok,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
} from "./gleam.mjs";
import * as $parser from "./parser.mjs";
import * as $render from "./render.mjs";
import * as $shape from "./shape.mjs";

const FILEPATH = "src/app.gleam";

export class Model extends $CustomType {
  constructor(source, code_open, output, shape_slider, speed, library, motion_loop) {
    super();
    this.source = source;
    this.code_open = code_open;
    this.output = output;
    this.shape_slider = shape_slider;
    this.speed = speed;
    this.library = library;
    this.motion_loop = motion_loop;
  }
}
export const Model$Model = (source, code_open, output, shape_slider, speed, library, motion_loop) =>
  new Model(source, code_open, output, shape_slider, speed, library, motion_loop);
export const Model$isModel = (value) => value instanceof Model;
export const Model$Model$source = (value) => value.source;
export const Model$Model$0 = (value) => value.source;
export const Model$Model$code_open = (value) => value.code_open;
export const Model$Model$1 = (value) => value.code_open;
export const Model$Model$output = (value) => value.output;
export const Model$Model$2 = (value) => value.output;
export const Model$Model$shape_slider = (value) => value.shape_slider;
export const Model$Model$3 = (value) => value.shape_slider;
export const Model$Model$speed = (value) => value.speed;
export const Model$Model$4 = (value) => value.speed;
export const Model$Model$library = (value) => value.library;
export const Model$Model$5 = (value) => value.library;
export const Model$Model$motion_loop = (value) => value.motion_loop;
export const Model$Model$6 = (value) => value.motion_loop;

export class SetCode extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetCode = ($0) => new SetCode($0);
export const Msg$isSetCode = (value) => value instanceof SetCode;
export const Msg$SetCode$0 = (value) => value[0];

export class SetShape extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetShape = ($0) => new SetShape($0);
export const Msg$isSetShape = (value) => value instanceof SetShape;
export const Msg$SetShape$0 = (value) => value[0];

export class SetSpeed extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SetSpeed = ($0) => new SetSpeed($0);
export const Msg$isSetSpeed = (value) => value instanceof SetSpeed;
export const Msg$SetSpeed$0 = (value) => value[0];

export class LoadLibrary extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$LoadLibrary = ($0) => new LoadLibrary($0);
export const Msg$isLoadLibrary = (value) => value instanceof LoadLibrary;
export const Msg$LoadLibrary$0 = (value) => value[0];

export class SelectDrawing extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$SelectDrawing = ($0) => new SelectDrawing($0);
export const Msg$isSelectDrawing = (value) => value instanceof SelectDrawing;
export const Msg$SelectDrawing$0 = (value) => value[0];

export class NewDrawing extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Msg$NewDrawing = ($0) => new NewDrawing($0);
export const Msg$isNewDrawing = (value) => value instanceof NewDrawing;
export const Msg$NewDrawing$0 = (value) => value[0];

export class Replay extends $CustomType {}
export const Msg$Replay$const = new Replay();
export const Msg$Replay = () => Msg$Replay$const;
export const Msg$isReplay = (value) => value instanceof Replay;

export class ToggleMotionLoop extends $CustomType {}
export const Msg$ToggleMotionLoop$const = new ToggleMotionLoop();
export const Msg$ToggleMotionLoop = () => Msg$ToggleMotionLoop$const;
export const Msg$isToggleMotionLoop = (value) =>
  value instanceof ToggleMotionLoop;

export class ToggleCode extends $CustomType {}
export const Msg$ToggleCode$const = new ToggleCode();
export const Msg$ToggleCode = () => Msg$ToggleCode$const;
export const Msg$isToggleCode = (value) => value instanceof ToggleCode;

const default_code = "fn draw(shape_slider: Int) -> List(Path) {\n  [Path(Line(Point(0, 0), Point(100, 100)), 0, 10, 2)]\n}\n";

/**
 * Your app's public address, once you've deployed it in Problem 13, such as
 * "https://your-username.github.io/animator/".
 */
export const public_url = "";

/**
 * Set to True if you would like your app's URL included in the course gallery.
 */
export const include_app_in_gallery = false;

/**
 * A link to your video from Problem 14, which anyone with the link can watch.
 */
export const video_url = "";

/**
 * Set to True if you would like your video included in the course gallery.
 */
export const include_video_in_gallery = false;

export function init(_) {
  let library = $data.defaults();
  return [
    new Model($data.current_source(library), true, "", 10, 1.0, library, true),
    $effect.from(
      (dispatch) => { return dispatch(new LoadLibrary($data.load())); },
    ),
  ];
}

function run_source(shape_slider, source) {
  let $ = $parser.parse_program(source, $builtins.global_frame());
  if ($ instanceof Ok) {
    let program = $[0];
    let _pipe = $drawing.try_draw(shape_slider, program);
    return $result.map_error(_pipe, $errors.error_message);
  } else {
    return $;
  }
}

function animate(paths, restart) {
  return $effect.from(
    (_) => {
      let rendered = $list.map(
        paths,
        (path) => { return $render.render_path(path, "#cfe3ff"); },
      );
      if (restart) {
        $render.reset_clock();
      } else {
        undefined;
      }
      return $render.set_drawing(rendered);
    },
  );
}

function redraw(model, restart) {
  let $ = run_source(model.shape_slider, model.source);
  if ($ instanceof Ok) {
    let paths = $[0];
    return [
      new Model(
        model.source,
        model.code_open,
        "",
        model.shape_slider,
        model.speed,
        model.library,
        model.motion_loop,
      ),
      animate(paths, restart),
    ];
  } else {
    let msg = $[0];
    return [
      new Model(
        model.source,
        model.code_open,
        msg,
        model.shape_slider,
        model.speed,
        model.library,
        model.motion_loop,
      ),
      animate($List$Empty$const, restart),
    ];
  }
}

function save_library(library) {
  return $effect.from((_) => { return $data.save(library); });
}

function open_drawing(model, library) {
  let source = $data.current_source(library);
  let $ = redraw(
    new Model(
      source,
      model.code_open,
      model.output,
      model.shape_slider,
      model.speed,
      library,
      model.motion_loop,
    ),
    true,
  );
  let model$1 = $[0];
  let drawing_effect = $[1];
  return [
    model$1,
    $effect.batch(
      listPrepend(
        $editor.mount(source, (var0) => { return new SetCode(var0); }),
        listPrepend(
          drawing_effect,
          listPrepend(save_library(library), $List$Empty$const),
        ),
      ),
    ),
  ];
}

export function update(model, msg) {
  if (msg instanceof SetCode) {
    let text = msg[0];
    let model$1 = new Model(
      text,
      model.code_open,
      model.output,
      model.shape_slider,
      model.speed,
      $data.update_source(model.library, text),
      model.motion_loop,
    );
    let $ = redraw(model$1, true);
    let model$2 = $[0];
    let drawing_effect = $[1];
    return [
      model$2,
      $effect.batch(
        listPrepend(
          drawing_effect,
          listPrepend(save_library(model$2.library), $List$Empty$const),
        ),
      ),
    ];
  } else if (msg instanceof SetShape) {
    let text = msg[0];
    let _block;
    let _pipe = $int.parse(text);
    _block = $result.unwrap(_pipe, model.shape_slider);
    let value = _block;
    let value$1 = $int.clamp(value, 0, 100);
    return redraw(
      new Model(
        model.source,
        model.code_open,
        model.output,
        value$1,
        model.speed,
        model.library,
        model.motion_loop,
      ),
      false,
    );
  } else if (msg instanceof SetSpeed) {
    let text = msg[0];
    let _block;
    let $ = $float.parse(text);
    if ($ instanceof Ok) {
      let rate = $[0];
      _block = rate;
    } else {
      let _pipe = $int.parse(text);
      let _pipe$1 = $result.map(_pipe, $int.to_float);
      _block = $result.unwrap(_pipe$1, model.speed);
    }
    let rate = _block;
    let rate$1 = $float.clamp(rate, -3.0, 3.0);
    return [
      new Model(
        model.source,
        model.code_open,
        model.output,
        model.shape_slider,
        rate$1,
        model.library,
        model.motion_loop,
      ),
      $effect.from((_) => { return $render.set_speed(rate$1); }),
    ];
  } else if (msg instanceof LoadLibrary) {
    let library = msg[0];
    return open_drawing(model, library);
  } else if (msg instanceof SelectDrawing) {
    let $ = msg[0];
    if ($ === "") {
      return [
        model,
        $effect.from(
          (dispatch) => {
            return dispatch(new NewDrawing($data.prompt_drawing_name()));
          },
        ),
      ];
    } else {
      let name = $;
      let $1 = $list.key_find(model.library.drawings, name);
      if ($1 instanceof Ok) {
        return open_drawing(
          model,
          (() => {
            let _record = model.library;
            return new $data.Library(_record.drawings, name);
          })(),
        );
      } else {
        return [model, $effect.none()];
      }
    }
  } else if (msg instanceof NewDrawing) {
    let name = msg[0];
    let name$1 = $string.trim(name);
    if (name$1 === "") {
      return [model, $effect.none()];
    } else {
      let _block;
      let $ = $list.key_find(model.library.drawings, name$1);
      if ($ instanceof Ok) {
        _block = model.library.drawings;
      } else {
        _block = $list.append(
          model.library.drawings,
          listPrepend([name$1, default_code], $List$Empty$const),
        );
      }
      let drawings = _block;
      return open_drawing(model, new $data.Library(drawings, name$1));
    }
  } else if (msg instanceof Replay) {
    return [model, $effect.from((_) => { return $render.reset_clock(); })];
  } else if (msg instanceof ToggleMotionLoop) {
    let enabled = !model.motion_loop;
    return [
      new Model(
        model.source,
        model.code_open,
        model.output,
        model.shape_slider,
        model.speed,
        model.library,
        enabled,
      ),
      $effect.from((_) => { return $render.set_motion_loop(enabled); }),
    ];
  } else {
    return [
      new Model(
        model.source,
        !model.code_open,
        model.output,
        model.shape_slider,
        model.speed,
        model.library,
        model.motion_loop,
      ),
      $effect.none(),
    ];
  }
}

function view_controls(model) {
  return $html.div(
    listPrepend($attr.class$("control-panel"), $List$Empty$const),
    listPrepend(
      $html.div(
        listPrepend($attr.class$("playback-buttons"), $List$Empty$const),
        listPrepend(
          $html.button(
            listPrepend(
              $attr.class$("icon-btn"),
              listPrepend($event.on_click(Msg$Replay$const), $List$Empty$const),
            ),
            listPrepend($html.text("↺ Replay"), $List$Empty$const),
          ),
          listPrepend(
            $html.label(
              listPrepend($attr.class$("loop-control"), $List$Empty$const),
              listPrepend(
                $html.input(
                  listPrepend(
                    $attr.type_("checkbox"),
                    listPrepend(
                      $attr.checked(model.motion_loop),
                      listPrepend(
                        $event.on_click(Msg$ToggleMotionLoop$const),
                        $List$Empty$const,
                      ),
                    ),
                  ),
                ),
                listPrepend($html.text("Loop vortex motion"), $List$Empty$const),
              ),
            ),
            $List$Empty$const,
          ),
        ),
      ),
      listPrepend(
        $html.label(
          listPrepend(
            $attr.for$("shape-slider"),
            listPrepend($attr.class$("slider-control"), $List$Empty$const),
          ),
          listPrepend(
            $html.span(
              $List$Empty$const,
              listPrepend(
                $html.text("Shape: " + $int.to_string(model.shape_slider)),
                $List$Empty$const,
              ),
            ),
            listPrepend(
              $html.input(
                listPrepend(
                  $attr.id("shape-slider"),
                  listPrepend(
                    $attr.attribute("data-test-id", "shape-slider"),
                    listPrepend(
                      $attr.type_("range"),
                      listPrepend(
                        $attr.min("0"),
                        listPrepend(
                          $attr.max("100"),
                          listPrepend(
                            $attr.step("1"),
                            listPrepend(
                              $attr.value($int.to_string(model.shape_slider)),
                              listPrepend(
                                $event.on_input(
                                  (var0) => { return new SetShape(var0); },
                                ),
                                $List$Empty$const,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              $List$Empty$const,
            ),
          ),
        ),
        listPrepend(
          $html.label(
            listPrepend(
              $attr.for$("speed-slider"),
              listPrepend($attr.class$("slider-control"), $List$Empty$const),
            ),
            listPrepend(
              $html.span(
                $List$Empty$const,
                listPrepend(
                  $html.text(("Speed: " + $float.to_string(model.speed)) + "×"),
                  $List$Empty$const,
                ),
              ),
              listPrepend(
                $html.input(
                  listPrepend(
                    $attr.id("speed-slider"),
                    listPrepend(
                      $attr.attribute("data-test-id", "speed-slider"),
                      listPrepend(
                        $attr.type_("range"),
                        listPrepend(
                          $attr.min("-3"),
                          listPrepend(
                            $attr.max("3"),
                            listPrepend(
                              $attr.step("0.1"),
                              listPrepend(
                                $attr.value($float.to_string(model.speed)),
                                listPrepend(
                                  $event.on_input(
                                    (var0) => { return new SetSpeed(var0); },
                                  ),
                                  $List$Empty$const,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                listPrepend(
                  $html.span(
                    listPrepend($attr.class$("control-hint"), $List$Empty$const),
                    listPrepend(
                      $html.text("Negative: reverse · 0: pause · 1: normal"),
                      $List$Empty$const,
                    ),
                  ),
                  $List$Empty$const,
                ),
              ),
            ),
          ),
          $List$Empty$const,
        ),
      ),
    ),
  );
}

function view_reveal_code(model) {
  let $ = model.code_open;
  if ($) {
    return $element.none();
  } else {
    return $html.button(
      listPrepend(
        $attr.class$("icon-btn reveal-code"),
        listPrepend(
          $attr.attribute("title", "Show code"),
          listPrepend($event.on_click(Msg$ToggleCode$const), $List$Empty$const),
        ),
      ),
      listPrepend($html.text("⟩"), $List$Empty$const),
    );
  }
}

function view_anim(model) {
  return $html.div(
    listPrepend($attr.class$("canvas-area"), $List$Empty$const),
    listPrepend(
      view_reveal_code(model),
      listPrepend(
        $html.canvas(
          listPrepend(
            $attr.id("animation-canvas"),
            listPrepend(
              $attr.class$("canvas"),
              listPrepend(
                $attr.attribute("aria-label", "Animated drawing"),
                $List$Empty$const,
              ),
            ),
          ),
        ),
        listPrepend(
          (() => {
            let $ = model.library.selected === "quantum_vortex";
            if ($) {
              return $html.div(
                listPrepend($attr.class$("vortex-caption"), $List$Empty$const),
                listPrepend(
                  $html.span(
                    listPrepend($attr.class$("vortex-title"), $List$Empty$const),
                    listPrepend(
                      $html.text("VORTEX OBSERVATORY"),
                      $List$Empty$const,
                    ),
                  ),
                  listPrepend(
                    $html.span(
                      $List$Empty$const,
                      listPrepend(
                        $html.text(
                          "Shape adds wave layers · Speed moves phase and depth",
                        ),
                        $List$Empty$const,
                      ),
                    ),
                    listPrepend(
                      $html.span(
                        $List$Empty$const,
                        listPrepend(
                          $html.text(
                            "Quantum-inspired artwork · not a physical simulation",
                          ),
                          $List$Empty$const,
                        ),
                      ),
                      $List$Empty$const,
                    ),
                  ),
                ),
              );
            } else {
              return $element.none();
            }
          })(),
          listPrepend(
            (() => {
              let $ = model.output;
              if ($ === "") {
                return $element.none();
              } else {
                let message = $;
                return $html.pre(
                  listPrepend(
                    $attr.class$("animation-error"),
                    listPrepend(
                      $attr.attribute("role", "alert"),
                      $List$Empty$const,
                    ),
                  ),
                  listPrepend($html.text(message), $List$Empty$const),
                );
              }
            })(),
            $List$Empty$const,
          ),
        ),
      ),
    ),
  );
}

function view_library(model) {
  return $html.div(
    listPrepend($attr.class$("library-panel"), $List$Empty$const),
    listPrepend(
      $html.label(
        listPrepend($attr.for$("drawing-select"), $List$Empty$const),
        listPrepend($html.text("Drawing"), $List$Empty$const),
      ),
      listPrepend(
        $html.select(
          listPrepend(
            $attr.id("drawing-select"),
            listPrepend(
              $attr.attribute("data-test-id", "drawing-select"),
              listPrepend(
                $attr.value(model.library.selected),
                listPrepend(
                  $event.on_change(
                    (var0) => { return new SelectDrawing(var0); },
                  ),
                  $List$Empty$const,
                ),
              ),
            ),
          ),
          $list.append(
            $list.map(
              model.library.drawings,
              (drawing) => {
                return $html.option(
                  listPrepend(
                    $attr.value(drawing[0]),
                    listPrepend(
                      $attr.selected(drawing[0] === model.library.selected),
                      $List$Empty$const,
                    ),
                  ),
                  drawing[0],
                );
              },
            ),
            listPrepend(
              $html.option(
                listPrepend($attr.value(""), $List$Empty$const),
                "+ New drawing…",
              ),
              $List$Empty$const,
            ),
          ),
        ),
        listPrepend(
          $html.span(
            listPrepend($attr.class$("control-hint"), $List$Empty$const),
            listPrepend($html.text("Saved automatically"), $List$Empty$const),
          ),
          $List$Empty$const,
        ),
      ),
    ),
  );
}

export function view(model) {
  let _block;
  let $ = model.code_open;
  if ($) {
    _block = "app";
  } else {
    _block = "app code-hidden";
  }
  let app_class = _block;
  return $html.div(
    listPrepend($attr.class$(app_class), $List$Empty$const),
    listPrepend(
      $html.div(
        listPrepend($attr.class$("code-col"), $List$Empty$const),
        listPrepend($editor.view_panel(Msg$ToggleCode$const), $List$Empty$const),
      ),
      listPrepend(
        $html.div(
          listPrepend($attr.class$("drawing-col"), $List$Empty$const),
          listPrepend(
            view_library(model),
            listPrepend(
              view_anim(model),
              listPrepend(view_controls(model), $List$Empty$const),
            ),
          ),
        ),
        $List$Empty$const,
      ),
    ),
  );
}

export function main() {
  let app = $lustre.application(init, update, view);
  let $ = $lustre.start(app, "#app", undefined);
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "app",
      384,
      "main",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 12287,
        end: 12336,
        pattern_start: 12298,
        pattern_end: 12303
      }
    )
  }
  return undefined;
}
