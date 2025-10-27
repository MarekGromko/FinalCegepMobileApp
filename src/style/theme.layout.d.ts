type Gradient = {
    colors:     string[],
    locations:  number[]
};

declare type ThemeLayout = {
    readonly background: string,
    readonly backgroundPanel: string,
    readonly backgroundCard: string,
    readonly text: string,
    readonly textDim: string,
    readonly textReversed: string,
    readonly primary: string,
    readonly primaryShade: string,
    readonly priamryDim: string,
    readonly primaryGradient: Gradient,
    readonly semantic: {
        readonly succes: string,
        readonly succesDim: string,
        readonly error: string,
        readonly errorDim: string
    }
}