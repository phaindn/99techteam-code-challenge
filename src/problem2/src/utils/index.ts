export function extractToken(value: string) {
    const [amount, currency] = value.split(' ').map((item, index) => {
        if (index == 0) {
            if (item == "") {
                return item;
            }
            return Number(item);
        }
        return item;
    }) as [number, string];

    return {
        amount,
        currency,
    }
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}