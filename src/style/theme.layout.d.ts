
/**
 * Can be easily used inside a LinearGradient jsx element
 * 
 * @example
 * ```tsx
 *  let gradient: Gradient // is set at some point
 *  <LinearGradient {...gradient}>
 *      // ...
 *  </LinearGradient>
 * ```
 */
type Gradient = {
    colors:     string[],
    locations:  number[]
};

/**
 * Layout for all themes values
 * Every custom theme should satisfies this tyoe
 * 
 * @see /style/themes/dark.ts
 */
declare type ThemeLayout = {
    readonly background: string,
    readonly blackBackground: string,
    readonly backgroundPanel: string,
    readonly backgroundCard: string,
    readonly text: string,
    readonly textDim: string,
    readonly textReversed: string,
    readonly primary: string,
    readonly primaryShade: string,
    readonly primaryDim: string,
    readonly primaryGradient: Gradient,
    readonly semantic: {
        readonly success: string,
        readonly successDim: string,
        readonly error: string,
        readonly errorDim: string
    }
}