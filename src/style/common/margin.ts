interface Margin {
    <const A>(allAround: A): { margin: A },
    <const A, const B>(vertical: A, horizontal: B): { marginVertical: A, marginHorizontal: B },
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