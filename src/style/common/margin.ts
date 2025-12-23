
/**
 * Create margin css properties
 * 
 * @example
 * ```js
 *  margin(10) // margin all around of 10px
 *  margin('50%', 10) // margin of 50% vertically, and 10px horizontally
 *  
 *  margin(1,2,3,4) // layout all around
 *  //      1px
 *  //  4px     2px
 *  //      3px
 * ```
 */
interface Margin {
    /** 
     * Create conform margin all around 
     * @param allAround the margin value
     * */
    <const A>(allAround: A): { margin: A },
    /**
     * Create vertical & horizontal margin
     * @param vertical the vertical margin value
     * @param horizontal the horizontal margin value
     */
    <const A, const B>(vertical: A, horizontal: B): { marginVertical: A, marginHorizontal: B },
    /**
     * Create defined margin value for each side
     * @param top the top margin value
     * @param right the right margin value
     * @param bottom the bottom margin value
     * @param left the left margin value
     */
    <const A, const B, const C, const D>(top: A, right: B, bottom: C, left: D): { marginTop: A, marginBottom: B, marginLeft: C, marginRight: D },
}
export const margin: Margin = (...args: any[]) => {
    switch (args.length) {
        case 1:
            return { margin: args[0] } as any
        case 2:
            const [v, h] = args;
            return { marginVertical: v, marginHorizontal: h } as any
        case 3:
            const [top, right, bottom, left] = args;
            return { marginTop: top, marginBottom: bottom, marginLeft: left, marginRight: right } as any
        default:
            return {} as any
    }
}