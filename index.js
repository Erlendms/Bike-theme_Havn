/**
 * README FOR YOUR OWN SANITY!
 *
 * Open this files's containing `.biketheme` folder in a code editor, such as
 * VSCode. This will provide type checking, inline documentation, and
 * autocomplete as you edit this file. I also recommend disabling Copilot, plain
 * autocomplete works better for these files.
 *
 * Bike will live-reload your editor view when you save changes to this file. If
 * you want to edit this file first make sure you have type checking and
 * autocomplete working, second make sure you have live reloading working. This
 * will make your life much easier.
 *
 * Bike themes are similar in _concept_ to CSS stylesheets, but the
 * implementation, syntax, and capabilities are quite different. Not CSS!
 *
 * IMPORTANT NOTES
 *
 * Theme styles are cached to improve performance. The values that you write
 * should be derived only from the inputs that you recieve. You should never
 * write values based on dates, times, globals, or randoms. All writen values
 * should be derived from the passed in env and passed in style.
 *
 * Rules of the same type are always processed in the same top to bottom order.
 */

// Custom colours
function getCustomColors(isDarkMode) {
  if (isDarkMode) {
    return {
      background: hexColor("#1a1e30"),
      backgroundSecondary: hexColor("#121521"),
      backgroundHighlight: hexColor("#56294A"),
      text: hexColor("#d7dbea"),
      textSecondary: hexColor("#eef0f6"),
      textHeading: hexColor("#8ea6cd"),
      textLinks: hexColor("#88b5a0"),
      accent: hexColor("#40786f"),
      midBlue: hexColor("#97a1c8"),
      selection: hexColor("#3a456f"),
      selectionBlock: hexColor("#1a3226"),
    };
  } else {
    return {
      background: hexColor("#f8f9fb"),
      backgroundSecondary: hexColor("#ebedf4"),
      backgroundHighlight: hexColor("#F3E7F0"),
      text: hexColor("#3e4a77"),
      textSecondary: hexColor("#212840"),
      textHeading: hexColor("#6988bc"),
      textLinks: hexColor("#5C947b"),
      accent: hexColor("#386a51"),
      midBlue: hexColor("#97a1c8"),
      selection: hexColor("#cdd2e5"),
      selectionBlock: hexColor("#d4E8de"),
    };
  }
}

// ----------------------------
// Editor Styles

defineViewportStyle((env, viewport) => {
  let theme = resolveTheme(env);
  viewport.padding = theme.viewportPadding;
  viewport.backgroundColor = theme.colors.background;
});

defineCaretStyle((env, caret) => {
  let theme = resolveTheme(env);
  if (env.isKey) {
    let accentColor;
    accentColor = theme.colors.accent;

    let pointSize = theme.fontAttributes.pointSize;
    caret.color = accentColor;
    caret.width = 2 * theme.uiScale;
    caret.blinkStyle = "continuous";
    caret.lineColor = theme.showCaretLine
      ? accentColor.withAlpha(0.02)
      : Color.clear();
    caret.messageFont = theme.font;
    caret.messageColor = theme.secondaryControlColor;
    caret.loadedAttributesFont = theme.font.withPointSize(pointSize * 0.6);
    if (env.settings.isDarkMode) {
      caret.loadedAttributesColor = theme.colors.textSecondary;
    } else {
      caret.loadedAttributesColor = theme.colors.background;
    }
  } else {
    caret.color = Color.clear();
    caret.lineColor = Color.clear();
    caret.blinkStyle = "none";
  }
});

// ----------------------------
// Global Row / Run styles

defineRowRule(".*", (env, row) => {
  let theme = resolveTheme(env);

  row.padding = theme.rowPadding;

  row.decoration("background", (background, layout) => {
    background.anchor.x = 0;
    background.anchor.y = 0;
    background.x = layout.leading;
    background.y = layout.top;
    background.zPosition = -1;
  });

  // Handles
  row.decoration("handle", (handle, layout) => {
    if (env.settings.isDarkMode) {
      handle.opacity = theme.secondaryControlAlpha * 0.3;
    } else {
      handle.opacity = theme.secondaryControlAlpha * 0.6;
    }
    // handle.opacity = theme.secondaryControlAlpha * 0;
    handle.contents.gravity = "center";
    let smallerFont = row.text.font.withPointSize(
      row.text.font.resolve(env).pointSize * 0.5,
    );
    handle.contents.image = symbolImage(
      "circle.fill",
      row.text.color,
      smallerFont,
    );

    handle.x = layout.leading.offset(theme.indent / 2);
    handle.y = layout.firstLine.centerY;
    let size = layout.firstLine.height;
    handle.width = size;
    handle.height = size;
    handle.rotation = 1.57;

    if (env.isTyping && theme.hideControlsWhenTyping) {
      handle.opacity = 0;
    }
  });

  if (theme.showGuideLines) {
    row.decoration("guide", (guide, layout) => {
      guide.color = theme.guideColor;
      guide.x = layout.leading.offset(theme.indent / 2);
      guide.y = layout.firstLine.bottom;
      guide.anchor.y = 0;
      guide.width = layout.fixed(Math.ceil(1 * theme.uiScale));
      guide.height = layout.fixed(0);
      if (env.isTyping && theme.hideControlsWhenTyping) {
        guide.opacity = 0;
      }
    });
  }

  row.text.font = theme.font;
  row.text.color = theme.colors.text;
  row.text.lineHeightMultiple = theme.lineHeightMultiple;
  row.text.margin = theme.rowTextMargin;
  row.text.padding = theme.rowTextPadding;

  row.text.decoration("background", (background, layout) => {
    background.anchor.x = 0;
    background.anchor.y = 0;
    background.x = layout.leading;
    background.y = layout.top;
    background.zPosition = -2;
  });
});

// ----------------------------
// Row Styles

defineRowRule(".parent() = true", (env, row) => {
  let theme = resolveTheme(env);
  row.text.decoration("focus", (focus, layout) => {
    let size = layout.lastLine.height;
    focus.contents.gravity = "center";
    focus.contents.image = symbolImage(
      "arrow.down.forward",
      theme.colors.text.withAlpha(0.2),
      row.text.font,
    );
    focus.x = layout.lastLine.trailing
      .offset(size.scale(0.5))
      .offset(row.text.padding.right);
    focus.y = layout.lastLine.centerY;
    focus.width = size;
    focus.height = size;
    if (env.isTyping && theme.hideControlsWhenTyping) {
      focus.opacity = 0;
    }
  });
  row.decoration("handle", (handle, layout) => {
    if (env.settings.isDarkMode) {
      handle.opacity = theme.secondaryControlAlpha * 2;
    } else {
      handle.opacity = theme.secondaryControlAlpha * 5;
    }
    let smallerFont = row.text.font.withPointSize(
      row.text.font.resolve(env).pointSize * 0.6,
    );
    handle.contents.image = symbolImage(
      "triangle",
      row.text.color,
      smallerFont,
    );

    if (env.isTyping && theme.hideControlsWhenTyping) {
      handle.opacity = 0;
    }
  });
});

defineRowRule(".parent() = true and focused-root() = true", (env, row) => {
  let theme = resolveTheme(env);
  row.text.decoration("focus", (focus, _) => {
    focus.rotation = 3.14;
    focus.contents.image = symbolImage(
      "arrow.down.forward",
      theme.colors.text.withAlpha(0.8),
      row.text.font,
    );
  });
});

defineRowRule(".parent() = true and collapsed() = true", (env, row) => {
  let theme = resolveTheme(env);
  row.decoration("handle", (handle, _) => {
    handle.opacity = 0.7;
    let smallerFont = row.text.font.withPointSize(
      row.text.font.resolve(env).pointSize * 0.55,
    );
    handle.contents.image = symbolImage(
      "triangle.fill",
      theme.colors.text,
      smallerFont,
    );
  });
});

defineRowRule(".parent() = true/run::paragraph-focus()", (env, row) => {
  row.text.color = Color.systemRed();
});

defineRowRule(".expanded() = true", (env, row) => {
  row.decoration("handle", (handle, _) => {
    handle.rotation = 3.14;
  });
  if (resolveTheme(env).showGuideLines) {
    row.decoration("guide", (guide, layout) => {
      guide.height = layout.bottom.minus(layout.firstLine.bottom);
    });
  }
});

defineRowRule(".body empty() = true", (env, row) => {
  row.decoration("handle", (handle, _) => {
    handle.opacity = 0.0;
  });
});

defineRowRule(".selection() = block", (env, row) => {
  let theme = resolveTheme(env);
  row.text.color = theme.colors.textSecondary;
  row.text.decoration("background", (background, _) => {
    background.color = theme.colors.selectionBlock;
  });
});

defineRowRule(".selection() = none", (env, row) => {
  row.text.scale = 0.5;
});

defineRowRule(".heading", (env, row) => {
  let theme = resolveTheme(env);
  row.text.font = row.text.font.withBold();
  row.text.scale = 1.1;
  row.text.kerning = 0.2;
  row.text.color = theme.colors.textHeading;
});
defineRowRule(".@type = heading and parent() = true", (env, row) => {
  row.text.decoration("focus", (focus, layout) => {
    let theme = resolveTheme(env);
    focus.contents.image = symbolImage(
      "arrow.down.forward",
      theme.colors.textHeading.withAlpha(0.3),
      row.text.font,
    );
  });
});
defineRowRule(
  ".@type = heading and parent() = true and focused-root() = true",
  (env, row) => {
    row.text.decoration("focus", (focus, layout) => {
      let theme = resolveTheme(env);
      focus.contents.image = symbolImage(
        "arrow.down.forward",
        theme.colors.textHeading.withAlpha(0.7),
        row.text.font,
      );
    });
  },
);
defineRowRule(".@type = heading and collapsed() = true", (env, row) => {
  let theme = resolveTheme(env);
  row.decoration("handle", (handle, _) => {
    handle.opacity = 0.7;
    let smallerFont = row.text.font.withPointSize(
      row.text.font.resolve(env).pointSize * 0.55,
    );
    handle.contents.image = symbolImage(
      "triangle.fill",
      theme.colors.textHeading.withAlpha(1),
      smallerFont,
    );
  });
});

defineRowRule(".blockquote", (env, row) => {
  let theme = resolveTheme(env);
  row.text.margin.left = theme.indent * 1.5;
  row.text.font = row.text.font.withItalics();
  row.text.decoration("mark", (mark, layout) => {
    mark.x = layout.leading.offset(-theme.indent / 3.7);
    mark.height = layout.height.offset(
      row.text.margin.top + row.text.margin.bottom,
    );
    mark.width = layout.fixed(Math.ceil(2 * theme.uiScale));
    mark.color = theme.colors.accent;
  });
});

defineRowRule(".codeblock", (env, row) => {
  row.text.font = row.text.font.withMonospace();
});

defineRowRule(".note", (env, row) => {
  let theme = resolveTheme(env);
  row.text.color = theme.colors.textSecondary.withAlpha(0.5);
});

defineRowRule(".unordered", (env, row) => {
  let theme = resolveTheme(env);
  let indent = theme.indent;
  row.text.margin.left = indent * 1.5;
  row.decoration("mark", (mark, layout) => {
    let size = layout.firstLine.height;
    mark.width = size;
    mark.height = size;
    mark.contents.gravity = "center";
    mark.contents.image = Image.fromText(
      new Text("•", row.text.font, theme.colors.accent),
    );
    mark.y = layout.firstLine.centerY;
    mark.x = layout.leading.offset(indent * 1.25);
  });
});

defineRowRule(".ordered", (env, row) => {
  let theme = resolveTheme(env);
  let indent = theme.indent;
  let index = env.orderedIndex ?? 0;
  row.text.margin.left = indent * 1.5;
  row.decoration("mark", (mark, layout) => {
    mark.x = layout.leading.offset(indent * 1.25);
    mark.y = layout.firstLine.centerY;
    let size = layout.firstLine.height;
    mark.width = size;
    mark.height = size;
    mark.contents.gravity = "center";
    mark.contents.image = Image.fromText(
      new Text(index + ".", row.text.font.withBold(), theme.colors.accent),
    );
  });
});

defineRowRule(".task", (env, row) => {
  let theme = resolveTheme(env);
  let indent = theme.indent;
  row.text.margin.left = indent * 1.5;
  row.decoration("mark", (mark, layout) => {
    mark.x = layout.leading.offset(indent * 1.25);
    mark.y = layout.firstLine.centerY;
    let size = layout.firstLine.height;
    mark.width = size;
    mark.height = size;
    mark.contents.gravity = "center";
    let smallerFont = row.text.font.withPointSize(
      row.text.font.resolve(env).pointSize * 0.6,
    );
    mark.contents.image = symbolImage(
      "square",
      theme.colors.accent,
      smallerFont,
    );
  });
});

defineRowRule(".@done", (env, row) => {
  row.text.strikethrough.thick = true;
  row.text.strikethrough.color = row.text.color.withAlpha(0.5);
  row.text.color = row.text.color.withAlpha(0.8);
});

defineRowRule(".task @done", (env, row) => {
  row.decoration("mark", (mark, _) => {
    let smallerFont = row.text.font.withPointSize(
      row.text.font.resolve(env).pointSize * 0.7,
    );
    mark.contents.image = symbolImage(
      "checkmark.square",
      row.text.color,
      smallerFont,
    );
  });
});

defineRowRule(".hr", (env, row) => {
  let theme = resolveTheme(env);

  // Hide the handle for HR rows
  row.decoration("handle", (handle, _) => {
    handle.opacity = 0.0;
  });

  row.text.decoration("ruler", (ruler, layout) => {
    ruler.height = layout.fixed(Math.ceil(1 * theme.uiScale));
    row.text.scale = 2;
    let offsetAmount = layout.width.scale(0.265);
    ruler.x = layout.centerX.minus(offsetAmount);
    ruler.width = layout.width.scale(0.5);
    ruler.color = theme.colors.midBlue;
  });
});

// ----------------------------
// Run Style Rules

defineRunRule(".@strong", (env, text) => {
  text.font = text.font.withWeight("semibold");
});

defineRunRule(".@emphasized", (env, text) => {
  text.font = text.font.withItalics();
});

defineRowRule(".@type = code", (env, row) => {
  let theme = resolveTheme(env);
  let uiScale = theme.uiScale;
  row.text.font = row.text.font.withMonospace();
  row.text.decoration("pre", (pre, layout) => {
    pre.zPosition = -1;
    pre.anchor.x = 0;
    pre.anchor.y = 0;
    pre.x = layout.leading.offset(-1 * uiScale);
    pre.y = layout.top.offset(-2 * uiScale);
    pre.width = layout.width.offset(10 * uiScale);
    pre.height = layout.height.offset(6 * uiScale);
    pre.corners.radius = 3 * uiScale;
    pre.color = theme.colors.backgroundSecondary;
  });
});

defineRunRule(".@code", (env, text) => {
  let theme = resolveTheme(env);
  let uiScale = theme.uiScale;
  text.font = text.font.withMonospace();
  text.decoration("code", (code, layout) => {
    code.zPosition = -1;
    code.anchor.x = 0;
    code.anchor.y = 0;
    code.x = layout.leading.offset(-2 * uiScale);
    code.y = layout.top.offset(1 * uiScale);
    code.width = layout.width.offset(4 * uiScale);
    code.height = layout.height.offset(-2 * uiScale);
    code.corners.radius = 3 * uiScale;
    code.color = theme.colors.backgroundSecondary;
  });
});

defineRunRule(".@highlight", (env, text) => {
  let theme = resolveTheme(env);
  let uiScale = theme.uiScale;
  text.color = theme.colors.textSecondary;
  text.decoration("highlight", (highlight, layout) => {
    highlight.zPosition = -1;
    highlight.anchor.x = 0;
    highlight.anchor.y = 0;
    highlight.x = layout.leading.offset(-2 * uiScale);
    highlight.y = layout.top.offset(1 * uiScale);
    highlight.width = layout.width.offset(4 * uiScale);
    highlight.height = layout.height.offset(-2 * uiScale);
    highlight.corners.radius = 3 * uiScale;
    highlight.color = theme.colors.backgroundHighlight;
  });
});

defineRunRule(".start-of-matches(.@highlight) = true", (env, text) => {
  text.margin.left = 2.5 * resolveTheme(env).uiScale;
});

defineRunRule(".end-of-matches(.@highlight) = true", (env, text) => {
  text.margin.right = 2.5 * resolveTheme(env).uiScale;
});

defineRunRule(".@strikethrough", (env, text) => {
  text.strikethrough.thick = true;
});

defineRunRule(".@link", (env, text) => {
  let theme = resolveTheme(env);
  text.color = theme.colors.textLinks;
});

defineRunRule(".end-of-matches(.@link) = true", (env, text) => {
  let symbol = new SymbolConfiguration("arrow.up.forward.app")
    .withSymbolScale("medium")
    .withFont(text.font.withWeight("semibold"))
    .withHierarchicalColor(text.color.withAlpha(1));
  let image = Image.fromSymbol(symbol);
  let imageWidth = image.resolve(env).width * 1.1;
  text.padding.right = imageWidth;
  text.decoration("button", (button, layout) => {
    button.x = layout.trailing;
    button.anchor.x = 0;
    button.width = layout.fixed(imageWidth);
    button.contents.gravity = "center";
    button.contents.image = image;
  });
});

defineRunRule(".@baseline = subscript", (env, text) => {
  let baseSize = text.font.resolve(env).pointSize;
  text.font = text.font.withPointSize(0.75 * baseSize);
  text.baselineOffset = baseSize * -0.25;
});

defineRunRule(".@baseline = superscript", (env, text) => {
  let baseSize = text.font.resolve(env).pointSize;
  text.font = text.font.withPointSize(0.75 * baseSize);
  text.baselineOffset = baseSize * 0.25;
});

defineRunRule(".@attachment/parent::hr", (env, text) => {
  text.attachmentSize.width = 1;
});

defineRunRule(".@view-selected-range", (env, text) => {
  let theme = resolveTheme(env);
  text.color = theme.colors.textSecondary;
  text.decoration("selection", (background, layout) => {
    background.zPosition = -2;
    background.anchor.x = 0;
    background.anchor.y = 0;
    background.x = layout.leading;
    background.y = layout.top;
    background.color = theme.colors.selection;
  });
});

// ----------------------------
// Outline Focus

defineRowRule(".focused-branch() = false", (env, row) => {
  let theme = resolveTheme(env);
  row.text.color = row.text.color.withAlpha(theme.outlineFocusAlpha);
  row.decorations((each, _) => {
    each.opacity *= theme.outlineFocusAlpha;
  });
  row.text.decorations((each, _) => {
    each.opacity *= theme.outlineFocusAlpha;
  });
});

defineRunRule(".*/parent::focused-branch() = false", (env, text) => {
  let theme = resolveTheme(env);
  text.decorations((each, _) => {
    each.opacity *= theme.outlineFocusAlpha;
  });
});

// ----------------------------
// Text Focus

defineRowRule(".*", (env, row) => {
  let theme = resolveTheme(env);
  if (theme.focusMode) {
    let textFocusAlpha = theme.textFocusAlpha;
    row.text.color = row.text.color.withAlpha(textFocusAlpha);
    row.decorations((each, _) => {
      each.opacity *= textFocusAlpha;
    });
    row.text.decorations((each, _) => {
      each.opacity *= textFocusAlpha;
    });
  }
});

defineRunRule(".*", (env, text) => {
  let theme = resolveTheme(env);
  if (theme.focusMode) {
    let textFocusAlpha = theme.textFocusAlpha;
    text.color = text.color.withAlpha(textFocusAlpha);
    text.decorations((each, _) => {
      each.opacity *= textFocusAlpha;
    });
  }
});

defineRowRule(".selection() = block", (env, row) => {
  let theme = resolveTheme(env);
  if (theme.focusMode) {
    let textFocusAlpha = theme.textFocusAlpha;
    row.decorations((each, _) => {
      each.opacity /= textFocusAlpha;
    });
    row.text.decorations((each, _) => {
      each.opacity /= textFocusAlpha;
    });
  }
});

defineRunRule(".@view-word-focus", (env, text) => {
  let theme = resolveTheme(env);
  if (theme.focusMode == "word") {
    let textFocusAlpha = theme.textFocusAlpha;
    text.color = text.color.withAlpha(1.0);
    text.decorations((each, _) => {
      each.opacity /= textFocusAlpha;
    });
  }
});

defineRunRule(".@view-sentence-focus", (env, text) => {
  let theme = resolveTheme(env);
  if (theme.focusMode == "sentence") {
    let textFocusAlpha = theme.textFocusAlpha;
    text.color = text.color.withAlpha(1.0);
    text.decorations((each, _) => {
      each.opacity /= textFocusAlpha;
    });
  }
});

defineRunRule(".@view-paragraph-focus", (env, text) => {
  let theme = resolveTheme(env);
  if (theme.focusMode == "paragraph") {
    let textFocusAlpha = theme.textFocusAlpha;
    text.color = text.color.withAlpha(1.0);
    text.decorations((each, _) => {
      each.opacity /= textFocusAlpha;
    });
  }
});

// ----------------------------
// Commit

defineRowRule(".*", (env, row) => {
  /*let scale = row.text.scale
    if (scale == 1) {
        return
    }
    row.decorations((each, _) => {
        if (each.applyRowScale) {
            each.contents
        }
    })*/
});

// ----------------------------
// Helpers

function symbolImage(name, color, font) {
  let symbol = new SymbolConfiguration(name)
    .withHierarchicalColor(color)
    .withFont(font);
  return Image.fromSymbol(symbol);
}

// Helper function to convert hex colors to Bike's Color format
function hexColor(hex, alpha = 1.0) {
  // Remove # if present
  hex = hex.replace(/^#/, "");

  // Parse the hex values
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  return new Color(r, g, b, alpha);
}

// ----------------------------
// Theme Values

function resolveTheme(env) {
  // Why this method and not just env.settings?
  //
  // This theme wants to override some env.settings values. For example when
  // wrapToColumn is enabled this theme scales the font based on viewport
  // width. That scaling is implemented here in resolveTheme. The rules in
  // this theme should read that scaled font, not env.settings.font.
  //
  // This theme also wanted to precompute some standard settings that can be
  // used by all the rules, such as colors, handle image, etc.
  if (env.cache.theme) {
    return env.cache.theme;
  }

  let settings = env.settings;
  let font = settings.font;
  let viewportSize = env.viewportSize;
  let typewriterMode = settings.typewriterMode;
  let wrapToColumn = settings.wrapToColumn ?? Number.MAX_SAFE_INTEGER;
  let geometry = computeGeometryForFont(font, env);
  const customColors = getCustomColors(settings.isDarkMode);
  if (wrapToColumn == 0 || wrapToColumn == Number.MAX_SAFE_INTEGER) {
    if (typewriterMode) {
      geometry.viewportPadding.top = viewportSize.height * typewriterMode;
    }
  } else {
    let golden = 1.618;
    let inverseGolden = 1 / golden;
    let xWidth = geometry.fontAttributes.xWidth;
    let textWidth = Math.ceil(xWidth * wrapToColumn);
    let rowWidth =
      textWidth +
      geometry.rowPadding.width +
      Math.max(geometry.rowTextMargin.width, geometry.rowTextPadding.width);
    let rowToViewRatio = rowWidth / viewportSize.width;

    if (rowToViewRatio > 2) {
      font = font.withPointSize(geometry.fontAttributes.pointSize - 1);
      geometry = computeGeometryForFont(font, env);
    } else if (rowToViewRatio < inverseGolden) {
      let desiredRowWidth = viewportSize.width * inverseGolden;
      let neededScale = 1.0 + (desiredRowWidth - rowWidth) / desiredRowWidth;
      font = font.withPointSize(
        geometry.fontAttributes.pointSize * neededScale,
      );
      geometry = computeGeometryForFont(font, env);
    }

    let rowWrapWidth = geometry.rowWrapWidth;

    if (rowWrapWidth) {
      let availibleWidth = viewportSize.width - rowWrapWidth;
      let sidePadding = Math.floor(availibleWidth / 2);
      geometry.viewportPadding.left = Math.max(
        sidePadding,
        geometry.viewportPadding.left,
      );
      geometry.viewportPadding.right = Math.max(
        sidePadding,
        geometry.viewportPadding.right,
      );
    }

    if (typewriterMode) {
      geometry.viewportPadding.top = viewportSize.height * typewriterMode;
    } else {
      let lineHeight =
        geometry.fontAttributes.pointSize * settings.lineHeightMultiple;
      if (rowWrapWidth + lineHeight * 64 < viewportSize.width) {
        geometry.viewportPadding.top = lineHeight * 8;
      } else if (rowWrapWidth + lineHeight * 32 < viewportSize.width) {
        geometry.viewportPadding.top = lineHeight * 4;
      } else if (rowWrapWidth + lineHeight * 16 < viewportSize.width) {
        geometry.viewportPadding.top = lineHeight * 2;
      } else if (rowWrapWidth + lineHeight * 2 < viewportSize.width) {
        geometry.viewportPadding.top = lineHeight * 1;
      }
    }
  }

  let uiScale = geometry.uiScale;
  let textColor = settings.textColor;
  let handleColor = textColor;
  let backgroundColor = settings.backgroundColor;
  let secondaryControlAlpha = settings.isDarkMode ? 0.175 : 0.075;
  let secondaryControlColor = textColor.withAlpha(secondaryControlAlpha);
  let guideColor = textColor.withAlpha(secondaryControlAlpha / 2);
  let selectionColor = env.isKey
    ? Color.textBackgroundSelected()
    : textColor.withFraction(0.8, backgroundColor);
  let blockSelectionColor = env.isKey
    ? Color.systemGreen().withFraction(0.5, backgroundColor)
    : textColor.withFraction(0.8, backgroundColor);

  let handleWidth = Math.max(1, 6 * uiScale);
  let handleHeight = Math.max(1, 10 * uiScale);
  let handlePath = new Path();
  handlePath.moveTo(new Point(0, 0));
  handlePath.addLineTo(new Point(0, handleHeight));
  handlePath.addLineTo(new Point(handleWidth, handleHeight / 2));
  handlePath.closeSubpath();
  let handleShape = new Shape(handlePath);
  handleShape.fill.color = handleColor;
  handleShape.line.width = 0;
  let handleImage = Image.fromShape(handleShape);

  env.cache.theme = {
    // User settings (font overriden)
    font: font,
    wrapToColumn: settings.wrapToColumn,
    lineHeightMultiple: settings.lineHeightMultiple,
    rowSpacingMultiple: settings.rowSpacingMultiple,
    isFullScreen: settings.isFullScreen,
    isDarkMode: settings.isDarkMode,
    textColor: textColor,
    accentColor: settings.accentColor,
    backgroundColor: settings.backgroundColor,
    focusMode: settings.focusMode,
    typewriterMode: settings.typewriterMode,
    showCaretLine: settings.showCaretLine,
    showGuideLines: settings.showGuideLines,
    hideControlsWhenTyping: settings.hideControlsWhenTyping,
    // Added theme settings
    fontAttributes: geometry.fontAttributes,
    indent: geometry.indent,
    uiScale: uiScale,
    rowPadding: geometry.rowPadding,
    rowTextMargin: geometry.rowTextMargin,
    rowTextPadding: geometry.rowTextPadding,
    viewportPadding: geometry.viewportPadding,
    selectionColor: selectionColor,
    blockSelectionColor: blockSelectionColor,
    handleColor: handleColor,
    guideColor: guideColor,
    separatorColor: textColor,
    secondaryControlColor: secondaryControlColor,
    secondaryControlAlpha: secondaryControlAlpha,
    handleImage: handleImage,
    outlineFocusAlpha: 0.15,
    textFocusAlpha: 0.15,
    colors: customColors,
  };

  return env.cache.theme;
}

function computeGeometryForFont(font, env) {
  let settings = env.settings;
  let viewportSize = env.viewportSize;
  let fontAttributes = font.resolve(env);
  let pointSize = fontAttributes.pointSize;
  let uiScale = pointSize / 14;
  let indent = 22 * uiScale;
  let rowPaddingBase = settings.rowSpacingMultiple * pointSize * uiScale;
  let rowTextPaddingBase = 5 * uiScale;
  let rowTextMarginBase = rowPaddingBase / 2;
  let rowPadding = new Insets(
    rowPaddingBase,
    rowPaddingBase,
    rowPaddingBase,
    indent,
  );
  let rowTextMargin = new Insets(rowTextMarginBase, 0, rowTextMarginBase, 0);
  let rowTextPadding = new Insets(0, rowTextPaddingBase, 0, rowTextPaddingBase);
  let viewportPadding = new Insets(
    10 * uiScale,
    10 * uiScale + indent,
    viewportSize.height * 0.5,
    10 * uiScale,
  );
  let wrapToColumn = settings.wrapToColumn ?? Number.MAX_SAFE_INTEGER;
  let rowWrapWidth = Number.MAX_SAFE_INTEGER;

  if (wrapToColumn > 0 && wrapToColumn < Number.MAX_SAFE_INTEGER) {
    let textWidth = Math.ceil(fontAttributes.xWidth * wrapToColumn);
    rowWrapWidth =
      textWidth +
      rowPadding.width +
      Math.max(rowTextMargin.width, rowTextPadding.width);
  }

  return {
    uiScale: uiScale,
    indent: indent,
    rowPadding: rowPadding,
    rowTextMargin: rowTextMargin,
    rowTextPadding: rowTextPadding,
    rowWrapWidth: rowWrapWidth,
    viewportPadding: viewportPadding,
    fontAttributes: fontAttributes,
  };
}
