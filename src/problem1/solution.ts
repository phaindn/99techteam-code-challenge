import { useMemoizedResult } from "./utils";

/**
 * best solution: using formula
 */
export function sumToN1(n: number) {
    if (n <= 0) {
        return 0;
    }
    return n * (n + 1) / 2;
}

/**
 * using simple for loop to take sum
 */
export function sumToN2(n: number) {
    if (n <= 0) {
        return 0;
    }
    let result = 0;
    for (let i = 1; i <= n; i++) {
        result += i;
    }

    return result;
}

/**
 * using recursion
 */
function recursiveSum(n: number): number {
    if (n <= 0) {
        return 0;
    }

    return n + recursiveSum(n - 1);
}

export const sumToN3 = useMemoizedResult<typeof recursiveSum>(recursiveSum);
