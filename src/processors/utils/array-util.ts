export function findArrayLike<T, S extends T>(
    array: ArrayLike<T>,
    predicate: (value: T, index: number) => value is S,
): S | undefined {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        const item = array[i];
        if (predicate(item, i)) {
            return item;
        }
    }
    return undefined;
}
