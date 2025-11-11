/**
 * Create padding css properties
 * 
 * @example
 * ```js
 *  padding(10) // padding all around of 10px
 *  padding('50%', 10) // padding of 50% vertically, and 10px horizontally
 *  
 *  padding(1,2,3,4) // layout all around
 *  //      1px
 *  //  4px     2px
 *  //      3px
 * ```
 */
export interface Padding {
    /** 
     * Create conform padding all around 
     * @param allAround the padding value
     * */
    <const A>(allAround: A): { padding: A };
    /**
     * Create vertical & horizontal padding
     * @param vertical the vertical padding value
     * @param horizontal the horizontal padding value
     */
    <const A, const B>(vertical: A, horizontal: B): { paddingVertical: A, paddingHorizontal: B };
    /**
     * Create defined padding value for each side
     * @param top the top padding value
     * @param right the right padding value
     * @param bottom the bottom padding value
     * @param left the left padding value
     */
    <const A, const B, const C, const D>(top: A, right: B, bottom: C, left: D): { paddingTop: A, paddingBottom: B, paddingLeft: C, paddingRight: D };
}
export const padding: Padding = (...args: any[]) => {
    switch (args.length) {
        case 1:
            return { padding: args[0] } as any
        case 2:
            const [v, h] = args;
            return { paddingVertical: v, paddingHorizontal: h } as any
        case 3:
            const [top, right, bottom, left] = args;
            return { paddingTop: top, paddingBottom: bottom, paddingLeft: left, paddingRight: right } as any
        default:
            return {} as any
    }
}