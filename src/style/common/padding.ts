interface Padding {
    <const A>(allAround: A): { padding: A },
    <const A, const B>(vertical: A, horizontal: B): { paddingVertical: A, paddingHorizontal: B },
    <const A, const B, const C, const D>(top: A, right: B, bottom: C, left: D): { paddingTop: A, paddingBottom: B, paddingLeft: C, paddingRight: D },
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