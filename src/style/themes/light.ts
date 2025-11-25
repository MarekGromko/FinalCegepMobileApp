/**
 * Light theme values
 */
export default {
    background:         "#F2F2F4",
    backgroundPanel:    "#E4E4E4",
    backgroundCard:     "#D7D7D7",
    blackBackground:    "#000",
    text:           "#202020",
    textDim:        "#20202088",
    textReversed:   "#F6F6F6",
    primary:        "#eea72eff",
    primaryShade:   "#D1B075",
    priamryDim:     "#E0AD5288",
    primaryGradient: {
        colors:     ['#96642c', '#dda74b', '#f5d27a', '#F7DEA1'],
        locations:  [0, 0.25, 0.7, 1]
    },
    semantic: {
        succes:     "#1BBE19",
        succesDim:  "#60DB9E4C",
        error:      "#D41A2A",
        errorDim:   "#DE878F4C"
    }
} as const satisfies ThemeLayout;