
/**
 * Create a flex row style
 * 
 * @example
 * ```ts
 *  const style = {
 *      view: {
 *          ...CS.Flex.row(10)
 *      }
 *  }
 * ```
 * @param columnGap the column gap, default to 0
 * @returns 
 */
export const row = (columnGap: number | string = 0) => ({
    display: 'flex',
    flexDirection: 'row',
    columnGap: columnGap
});

/**
 * Create a centered flex row style
 * 
 * @example
 * ```ts
 *  const style = {
 *      view: {
 *          ...CS.Flex.centeredRow(10)
 *      }
 *  }
 * ```
 * @param columnGap the column gap, default to 0
 * @returns 
 */
export const centeredRow = (columnGap: number | string = 0) => ({
    ...row(columnGap),
    alignItems: 'center',
});

/**
 * Create a flex column style
 * 
 * @example
 * ```ts
 *  const style = {
 *      view: {
 *          ...CS.Flex.column(10)
 *      }
 *  }
 * ```
 * @param rowGap the row gap, default to 0
 * @returns 
 */
export const column = (rowGap: number | string = 0) => ({
    display: 'flex',
    flexDirection: 'column',
    rowGap: rowGap
});

/**
 * Create a centered flex column style
 * 
 * @example
 * ```ts
 *  const style = {
 *      view: {
 *          ...CS.Flex.centeredColumn(10)
 *      }
 *  }
 * ```
 * @param rowGap the row gap, default to 0
 * @returns 
 */
export const centeredColumn = (rowGap: number | string = 0) => ({
    ...column(rowGap),
    alignItems: 'center',
    justifyContent: 'center',
})
