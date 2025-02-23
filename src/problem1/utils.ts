// utilize function to store function's execution result
export function useMemoizedResult<T = Function>(func: Function) {
    // create a map to store calculated result
    const memoizedResult = new Map();

    return ((...args: any[]) => {
        if (memoizedResult.has(args)) {
            return memoizedResult.get(args);
        }
        const result = func(args);
        memoizedResult.set(args, result);

        return result;
    }) as T;
}