//
// GENERATED CONTENT: SHOULD NOT BE MODIFIED!
//
// This file contains type definitions and documentation for the functions and
// objects that you can use in your Bike theme `index.js` script. This file is
// never built or run, it is only used to provide type checking and autocomplete
// when you edit your `index.js` file in a compatible editor, such as VSCode.

interface DefineViewportStyleFunction {
    /**
     * @param apply - Function to modify ViewportStyle
     */
    (apply: (environment: Environment, viewport: ViewportStyle) => void);
}

declare let defineViewportStyle: DefineViewportStyleFunction;

interface DefineCaretStyleFunction {
    /**
     * @param apply - Function to modify CaretStyle
     */
    (apply: (environment: Environment, caret: CaretStyle) => void);
}

declare let defineCaretStyle: DefineCaretStyleFunction;

interface DefineRowRuleFunction {
    /**
     * @param match - Relative outline path to match rows
     * @param apply - Function to modify RowStyle when rule matches
     */
    (match: string, apply: (environment: Environment, row: RowStyle) => void);
}

declare let defineRowRule: DefineRowRuleFunction;

interface DefineRunRuleFunction {
    /**
     * @param match - Relative outline path to match text runs
     * @param apply - Function to modify TextStyle when rule matches
     */
    (match: string, apply: (environment: Environment, text: TextRunStyle) => void): Object;
}

declare let defineRunRule: DefineRunRuleFunction;

/** Environment – The environment passed into the `defineStyle` functions */
interface Environment {
    /** True when editor has keyboard focus  */
    isKey: boolean;
    /** True when editor is typing (mouse hidden)  */
    isTyping: boolean;
    /** True when editor is filtering  */
    isFiltering: boolean;
    /** Size of the editor's viewport  */
    viewportSize: Size;
    /** Ordered row index  */
    orderedIndex?: number;
    /** User specified settings  */
    settings: Settings;
    /** Use to cache computed values derived from the environment. This cache is cleared when the environment changes  */
    cache: Object;
}

/** Settings – User settings that style rules should generally follow. */
interface Settings {
    font: Font;
    wrapToColumn?: number;
    lineHeightMultiple: number;
    rowSpacingMultiple: number;
    isFullScreen: boolean;
    isDarkMode: boolean;
    textColor: Color;
    accentColor: Color;
    backgroundColor: Color;
    focusMode?: FocusMode
    /** 0-1 value representing y-postion in viewport that will be scrolled to  */
    typewriterMode?: number;
    showCaretLine: boolean;
    showGuideLines: boolean;
    hideControlsWhenTyping: boolean;
}

type FocusMode = 'paragraph' | 'sentence' | 'word'

/** CaretStyle – The global text caret style */
interface CaretStyle {
    /** The caret color  */
    color: Color;
    /** The caret width  */
    width: number;
    /** The caret blink style  */
    blinkStyle: CaretBlinkStyle;
    /** The caret line background color  */
    lineColor: Color
    /** The font of caret messages */
    messageFont: Font
    /** The color of caret messages */
    messageColor: Color;
    /** The font of caret loaded attributes */
    loadedAttributesFont: Font
    /** The color of caret loaded attributes */
    loadedAttributesColor: Color;
}

/** CaretBlinkStyle - Caret blink style */
type CaretBlinkStyle = 'discrete' | 'continuous' | 'none'

/** ViewportStyle – The global viewport style */
interface ViewportStyle {
    /** The viewport insets  */
    padding: Insets;
    /** The viewport background  */
    backgroundColor: Color;
}

/**
 * RowStyle – The style for a row in the outline.
 *
 * Row style only applies to an individual row, not to the rows contained by
 * this row.
 */
interface RowStyle extends DecorationContainer {
    /** The row padding. Generally used to create outline indentation */
    padding: Insets;
    /** The row's text style, effects only the matched rows text, not contained rows */
    text: TextStyle;
}

/**
 * TextStyle - The style for row text.
 */
interface TextStyle extends TextContainer {
    /** Text scale */
    scale: number
    /** The line height multiple */
    lineHeightMultiple: number;
}

/**
 * TextRunStyle – The style for text runs.
 */
interface TextRunStyle extends TextContainer {
    /** Enclosing text's scale */
    readonly scale: number
    
    /**
     * Attachment size. Ignored unless text run contains a singel attatchment
     * character. Currently only used when implementing hr's.
     *
     * 0-1 percent of line width. >1 fixed size (defaults 1) 0-1 percent of line
     * height. >1 fixed size (defaults 1)
     */
    attachmentSize: Size;
}

/** Ligature - Text ligature style */
type Ligature = 'default' | 'none' | 'all'

/** TextLine - Wrapps a NSUnderlineStyle. */
interface TextLineStyle {
    /** The color of the line. */
    color: Color;
    /** True enables the single line flag. */
    single: boolean;
    /** True enables the thick line flag. */
    thick: boolean;
    /** True enables the double line flag. */
    double: boolean;
    /** True enables the patternSolid flag. */
    patternDot: boolean;
    /** True enables the patternDash flag. */
    patternDash: boolean;
    /** True enables the patternDashDot flag. */
    patternDashDot: boolean;
    /** True enables the patternDashDotDot flag. */
    patternDashDotDot: boolean;
    /** True enables the byWord flag. */
    byWord: boolean;
}

/**
 * TextContainer - Common text style properties shared by TextStyle and TextRunStyle
 */
interface TextContainer extends DecorationContainer {
    /** Text font */
    font: Font;
    /** The run kerning (default 0) */
    kerning: number;
    /** The run tracking (default 0) */
    tracking: number;
    /** The run ligature */
    ligature: Ligature;
    /** The run baseline offset */
    baselineOffset: number;
    /** Text foreground color */
    color: Color;
    /** Text background color */
    backgroundColor: Color;
    /** Text underline style */
    underline: TextLineStyle;
    /** Text strikethrough style */
    strikethrough: TextLineStyle;
    /** Text margins */
    margin: Insets;
    /** Text padding */
    padding: Insets;
}

/**
 * DecorationContainer - And object to which visual decorations are attatched.
 * Row, Row text, and Row text runs are all decoration containers. Decoration
 * containers provide methods to add and modify decorations and provide the
 * layout object that's used to position the decorations relative to the
 * container.
 */
interface DecorationContainer {
    /**
     * Add/Modify decoration by id.
     *
     * @param id - Decoration id
     * @param modify - Function to modify decoration
     */
    decoration(id: string, modify: (decoration: Decoration, layout: Layout) => void): void;

    /**
     * List and modify all existing decorations.
     *
     * @param modify - Function to modify each existing decoration
     */
    decorations(modify: (decoration: Decoration, layout: Layout) => void): void;
}

/**
 * Decoration - Add visual decoration's to outline.
 *
 * Decorations are used to draw visuals that are attached to a row or text run.
 * They can have a background color, border, and corner radius. They can also
 * have image content. Decorations do not effect layout, you need to make space
 * for them using row and text padding and margins.
 *
 * Decorations closely wrap a `CALayer`. Look into the `CALayer` documentation
 * for more information on possiblilities.
 */
interface Decoration {
    /** Optional action triggered when clicked */
    action?: Action;
    /** Hidden (default false) */
    hidden: boolean;
    /** Opacity (0-1) */
    opacity: number;
    /** Optional border */
    border: DecorationBorder;
    /** Corners */
    corners: DecorationCorners;
    /** Optional layer contents */
    contents: DecorationContents;
    /** Background color */
    color: Color;
    /** Radian rotation (default 0) */
    rotation: number;
    /** Depth ordering (default 0) */
    zPosition: number;
    /** Relative (0-1) Position on decoration that is positioned (default to center, 0.5, 0.5) */
    anchor: Point;
    /** The x value (default container center) */
    x: LayoutValue;
    /** The y value (default container center) */
    y: LayoutValue;
    /** The width value (default fill container) */
    width: LayoutValue;
    /** The height value (default fill container) */
    height: LayoutValue;
    
    // Transitions?
    // Animations?
}

// Action - NOT WORKING YET!
type Action = "toggle-fold" | "toggle-done" | "toggle-focus";

/**
 * Layout - Decorations are positioned relative to a layout.
 *
 * The layout provides access to layout values which are assigned to the
 * decorations x, y, width, and height. Layout values can be used on own, or
 * combined with each other in various ways.
 *
 * Layouts also provide access to two child layouts: `firstLine` and `lastLine`.
 * For example to get the layout value for the bottom of the first line of a
 * row you could use `layout.firstLine.bottom`. While in the same context
 * `layout.bottom` would give the layout value for the bottom of the row.
 */
interface Layout {
    firstLine: Layout
    lastLine: Layout
    width: LayoutValue
    height: LayoutValue
    top: LayoutValue
    bottom: LayoutValue
    baseline: LayoutValue
    centerY: LayoutValue
    leading: LayoutValue
    trailing: LayoutValue
    centerX: LayoutValue
    fixed(value: number): LayoutValue;
}

/**
 * LayoutValue - A logical layout value that is resolved to a number by the
 * layout process and then used to set a Decoration's x, y, width, and height
 * properties.
 */
interface LayoutValue {
    /** Construct a new LayoutValue that is the min between the this and the value parameter. */
    min(value: number | LayoutValue): LayoutValue;
    /** Construct a new LayoutValue that is the max between the this and the value parameter. */
    max(value: number | LayoutValue): LayoutValue;
    /** Construct a new LayoutValue that is this value multiplied by the value parameter. */
    scale(value: number | LayoutValue): LayoutValue;
    /** Construct a new LayoutValue that is this value offset by the value parameter. */
    offset(value: number | LayoutValue): LayoutValue;
    /** Construct a new LayoutValue that is this value minus the value parameter. */
    minus(value: number | LayoutValue): LayoutValue;
}

/** DecorationBorder - Wraps CALayer border */
interface DecorationBorder {
    /** Line color */
    color: Color;
    /** Line width */
    width: number;
}

/** DecorationCorners - Wraps CALayer corner */
interface DecorationCorners {
    /** Corner radius */
    radius: number;
    /** Apply radius to top right corner (default true) */
    maxXMaxYCorner: boolean;
    /** Apply radius to bottom right corner (default true) */
    maxXMinYCorner: boolean;
    /** Apply radius to top left corner (default true) */
    minXMaxYCorner: boolean;
    /** Apply radius to bottom left corner (default true) */
    minXMinYCorner: boolean;
}

/**
 * DecorationContents - Wraps CALayer contents values.
 *
 * Decoration content is eventually an bitmap image, but you can construct that
 * image from text, shapes, and symbols. In addition to standard images.
 */
interface DecorationContents {
    /** Contents Image */
    image: Image;
    /** Contents Rect, portion of contents to use */
    rect: Rect;
    /** Contents Center, portion of contents to stretch */
    center: Rect;
    /** Contents Gravity, how to position and scale contents */
    gravity: ContentsGravity;
}

/** ContentsGravity - Wraps CALayerContentsGravity */
type ContentsGravity =
    'bottom' |
    'bottomLeft' |
    'bottomRight' |
    'center' |
    'left' |
    'resize' |
    'resizeAspect' |
    'resizeAspectFill' |
    'right' |
    'top' |
    'topLeft' |
    'topRight';

/** Image - Used for Decoration content */
interface Image {
    /** @returns A new image with new size */
    withSize(size: Size): Image;
    /** @returns A new image with scaled size */
    withScale(scale: number): Image;
    /** @returns A new image by compositing this image with parameter */
    withComposite(image: Image): Image;
    /** @returns Resolved image attributes */
    resolve(env: Environment): {
        width: number
        height: number
    };
}

/** Image - Create images by name, or from text, shapes, and symbols. */
interface ImageConstructor {
    none(): Image;
    fromText(text: Text): Image;
    fromShape(shape: Shape): Image;
    fromSymbol(symbol: SymbolConfiguration): Image;
    new (name: string): Image;
}

declare let Image: ImageConstructor;

/**
 * Text - Text with a font, color, and string. Use as decoration image content.
 */
interface Text {
    font: Font;
    color: Color;
    string: string;
}

interface TextConstructor {
    new (string: String, font?: Font, color?: Color): Text;
}

declare let Text: TextConstructor;

/**
 * Shape - Path with stroke and color. Use as decoration image content.
 */
interface Shape {
    path: Path;
    line: ShapeLine;
    fill: ShapeFill;
    stroke: ShapeStroke;
    padding: Insets;
}

interface ShapeConstructor {
    new (path: Path): Shape;
}

declare let Shape: ShapeConstructor;

interface ShapeLine {
    cap: LineCap;
    dashPattern?: [number];
    dashPhase: number;
    join: LineJoin;
    width: number;
    miterLimit: number;
}

interface ShapeFill {
    color: Color;
    rule: FillRule;
}

interface ShapeStroke {
    color: Color;
    start: number;
    end: number;
}

/**
 * SymbolConfiguration – Wraps NSImage.SymbolConfiguration. Use as decoration
 * image content
 */
interface SymbolConfiguration {
    withFont(font: Font): SymbolConfiguration;
    withSymbolScale(scale: SymbolScale): SymbolConfiguration;
    withHierarchicalColor(color: Color): SymbolConfiguration;
    withPaletteColors(colors: [Color]): SymbolConfiguration;
    preferingMonochrome(): SymbolConfiguration;
    preferingMulticolor(): SymbolConfiguration;
    preferingHierarchical(): SymbolConfiguration;
}

interface SymbolConfigurationConstructor {
    new (name: string, variableValue?: number): SymbolConfiguration;
}

declare let SymbolConfiguration: SymbolConfigurationConstructor;

/** SymbolConfigurationScale – Use font for symbol size, then adjust with symbol scale */
type SymbolScale =
    'small' |
    'medium' |
    'large';

/**
 * Font - Wraps a `NSFontDescriptor`.
 *
 * This class can be a bit mysterious to work with. You are creating a
 * description of a font that you want, but sometimes that described font might
 * not exist. For example the following font might surprise:
 *
 * ```
 * new Font("Helvetica", 24).withMonospace()
 * ```
 *
 * You will likely get Helvetica at 24 points. The `withMonospaced` call will
 * have no effect because there isn't a monospaced version of Helvetica on your
 * computer.
 *
 * Generally if you are confused look into how `NSFontDescriptor` works. This is
 * a light wrapper around that class.
 */
interface Font {

    /** @returns A new font with family */
    withFamily(family: String): Font;

    /** @returns A new font with face */
    withFace(face: String): Font;

    /** @returns A new font with point size */
    withPointSize(pointSize: number): Font;

    /** @returns A new font with weigth */
    withWeight(weight: FontWeight): Font;

    /** @returns A new font with bold trait */
    withBold(): Font;

    /** @returns A new font with italic trait */
    withItalics(): Font;
        
    /** @returns A new font with monospace trait */
    withMonospace(): Font;
    
    /** @returns A new font with small caps features */
    withSmallCaps(): Font;
    
    /** @returns A new font with lowercase small caps features */
    withLowercaseSmallCaps(): Font;
    
    /** @returns A new font with uppercase small caps features */
    withUppercaseSmallCaps(): Font;
    
    /** @returns A new font with monospaced digit features */
    withMonospacedDigit(): Font;

    /** @returns Resolved font attributes */
    resolve(env: Environment): {
        name: String,
        pointSize: number
        ascender: number
        descender: number
        xHeight: number
        xWidth: number
        maximumAdvancement: Size
    };
}

interface FontConstructor {

    systemBody(): Font;
    systemCallout(): Font;
    systemCaption1(): Font;
    systemCaption2(): Font;
    systemFootnote(): Font;
    systemHeadline(): Font;
    systemSubheadline(): Font;
    systemLargeTitle(): Font;
    systemTitle1(): Font;
    systemTitle2(): Font;
    systemTitle3(): Font;

    /**
     * @param name - The font family, ex. "Helvetica"
     * @param pointSize - The font point size, ex. 12
     */
    new (name: string, pointSize: number): Font;
}

declare let Font: FontConstructor;

/** FontWeight */
type FontWeight =
    'ultraLight' |
    'thin' |
    'light' |
    'regular' |
    'medium' |
    'semibold' |
    'bold' |
    'heavy' |
    'black';

/** Color - Wraps an unerlying CGColor. */
interface Color {

    /**
     * @param alpha - The alpha component (0-1)
     * @returns A new color with the same RGB components and the specified alpha component
     */
    withAlpha(alpha: number): Color;

    /**
     * @param fraction - The fraction of the color to blend with (0-1)
     * @param color - The color to blend with
     * @returns A new color with the specified fraction of the specified color blended in
     */
    withFraction(fraction: number, color: Color): Color;
    
    /** @returns Resolved color attributes */
    resolve(env: Environment): {
        alpha: number,
        pattern?: Image
        components?: {
            red: number
            green: number
            blue: number
        }
    };
}

interface ColorConstructor {
    none(): Color;
    black(): Color;
    white(): Color;
    clear(): Color;
    controlAccent(): Color;

    text(): Color;
    textHeader(): Color;
    textBackground(): Color;
    textBackgroundSelected(): Color;
    textInsertionPoint(): Color;
    selectedContentBackground(): Color;
    unemphasizedSelectedContentBackground(): Color;

    label(): Color;
    secondaryLabel(): Color;
    tertiaryLabel(): Color;
    quaternaryLabel(): Color;
    quinaryLabel(): Color;

    link(): Color;
    shadow(): Color;
    separator(): Color;
    highlight(): Color;
    findHighlight(): Color;

    systemBlue(): Color;
    systemBrown(): Color;
    systemCyan(): Color;
    systemGray(): Color;
    systemGreen(): Color;
    systemIndigo(): Color;
    systemMint(): Color;
    systemOrange(): Color;
    systemPink(): Color;
    systemPurple(): Color;
    systemRed(): Color;
    systemTeal(): Color;
    systemYellow(): Color;

    /**
     * @param white - The white component (0-1)
     */
    gray(white: number): Color

    /**
     * @param image - The image to use as a tile pattern when filling the color
     */
    pattern(image: Image): Color

    /**
     * @param red - The red component (0-1)
     * @param green - The green component (0-1)
     * @param blue - The blue component (0-1)
     * @param alpha - The alpha component (0-1)
     */
    new (red: number, green: number, blue: number, alpha: number): Color;
}

declare let Color: ColorConstructor;

/** Path - Wraps an unerlying CGPath. */
interface Path {
    copy(transform?: AffineTransform): Path;
    copyDashing(phase: number, lengths: number[], transform?: AffineTransform): Path;
    copyStroking(width: number, lineCap: LineCap, lineJoin: LineJoin, miterLimit: number, transform?: AffineTransform): Path;

    componentsSeparated(using?: FillRule): [Path];
    flattened(threshhold: number): Path;
    intersection(other: Path, using?: FillRule): Path;
    lineIntersection(other: Path, using?: FillRule): Path;
    lineSubtracting(other: Path, using?: FillRule): Path;
    normalized(using?: FillRule): Path;
    subtracting(other: Path, using?: FillRule): Path;
    symetricDifference(other: Path, using?: FillRule): Path;
    union(other: Path, using?: FillRule): Path;

    moveTo(point: Point, transform?: AffineTransform): void;
    addLineTo(point: Point, transform?: AffineTransform): void;
    addRect(rect: Rect, transform?: AffineTransform): void;
    addRoundedRect(rect: Rect, cornerWidth: number, cornerHeight: number, transform?: AffineTransform): void;
    addEllipseInRect(rect: Rect, transform?: AffineTransform): void;
    addArc(center: Point, radius: number, startAngle: number, endAngle: number, clockwise: boolean, transform?: AffineTransform): void;
    addRelativeArc(center: Point, radius: number, startAngle: number, delta: number, transform?: AffineTransform): void;
    addCurveTo(point: Point, control1: Point, control2: Point, transform?: AffineTransform): void;
    addQuadCurveTo(point: Point, control: Point, transform?: AffineTransform): void;
    addPath(path: Path, transform?: AffineTransform): void;

    closeSubpath(): void;
}

type LineCap = 'butt' | 'round' | 'square';
type LineJoin = 'miter' | 'round' | 'bevel';
type FillRule = 'evenOdd' | 'winding';

interface PathConstructor {
    rect(rect: Rect, transform?: AffineTransform): Path;
    roundedRect(rect: Rect, cornerWidth: number, cornerHeight: number, transform?: AffineTransform): Path;
    elipseInRect(rect: Rect, transform?: AffineTransform): Path;
    new (): Path;
}

declare let Path: PathConstructor;

/** AffineTransform - Wraps an unerlying CGAffineTransform. */
interface AffineTransform {
    readonly isIdentity: boolean;

    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;

    concating(transform: AffineTransform): AffineTransform;
    inverted(): AffineTransform;
    rotatedBy(radians: number): AffineTransform;
    scaledBy(x: number, y: number): AffineTransform;
    translatedBy(x: number, y: number): AffineTransform;
}

interface AffineTransformConstructor {
    new (): AffineTransform;
}

declare let AffineTransform: AffineTransformConstructor;

/** Insets - Wraps a NSEdgeInsets. */
interface Insets {
    /** The top inset */
    top: number;
    /** The right inset */
    right: number;
    /** The bottom inset */
    bottom: number;
    /** The left inset */
    left: number;
    
    readonly width: number;
    readonly height: number;
    
    scaled(scale: number): Insets
}

interface InsetsConstructor {
    zero(): Insets;
    new (top: number, right: number, bottom: number, left: number): Insets;
}
  
declare let Insets: InsetsConstructor;

/** Rect - Wraps an unerlying CGRect. */
interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface RectConstructor {
    zero(): Rect;
    new (x: number, y: number, width: number, height: number): Rect;
}

declare let Rect: RectConstructor;

/** Point - Wraps an unerlying CGPoint. */
interface Point {
    x: number;
    y: number;
}

interface PointConstructor {
    zero(): Point;
    new (x: number, y: number): Point;
}

declare let Point: PointConstructor;

/** Size - Wraps an unerlying CGSize. */
interface Size {
    width: number;
    height: number;
}

interface SizeConstructor {
    zero(): Size;
    new (width: number, height: number): Size;
}

declare let Size: SizeConstructor;
