export const row = (columnGap: number | string = 0) => ({
    display: 'flex',
    flexDirection: 'row',
    columnGap: columnGap
});
export const centeredRow = (columnGap: number | string = 0) => ({
    ...row(columnGap),
    alignItems: 'center',
});
export const column = (rowGap: number | string = 0) => ({
    display: 'flex',
    flexDirection: 'column',
    rowGap: rowGap
});
export const centeredColumn = (rowGap: number | string = 0) => ({
    ...column(rowGap),
    alignItems: 'center',
    justifyContent: 'center',
})
