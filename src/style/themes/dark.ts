/**
 * Dark theme values
 */
export default {
    background:         "#060606",
    blackBackground:   "#000",
    backgroundPanel:    "#282828",
    backgroundCard:     "#444444",
    text:           "#FDFDFF",
    textDim:        "#FDFDFF88",
    textReversed:   "#101010",
    primary:        "#e2a232ff",
    primaryShade:   "#C2923D",
    priamryDim:     "#E0AD5288",
    primaryGradient: {
        colors:     ['#96642c', '#dda74b', '#f5d27a', '#F7DEA1'],
        locations:  [0, 0.25, 0.7, 1]
    },
    semantic: {
        succes:     "#1BBE19",
        succesDim:  "#06EC754C",
        error:      "#EC0616",
        errorDim:   "#EC06164C"
    }
} as const satisfies ThemeLayout;