interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}

// this utilize function should be moved to a separated file
const getPriority = (blockchain: any): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100
    case 'Ethereum':
      return 50
    case 'Arbitrum':
      return 30
    case 'Zilliqa':
      return 20
    case 'Neo':
      return 20
    default:
      return -99
  }
}


const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  /**
   * if we're using redux, we can use createSelector from 'reselect' to create a selector which return sorted balances directly
   */

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      // shorten the condition
      return (balancePriority > -99) && (balance.amount <= 0);
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      // we can reduce calculation complexity by directly return the value of (leftPriority - rightPriority)
      // => reduced 2 conditions
      return leftPriority - rightPriority;
    });
    // remove unused prices variable from dependencies to avoid unattened calculation => improve performance
  }, [balances]);

  /**
   * formattedBalances is not neccessary since we only want to add a property name `formatted` then use it to render row
   * so I removed it and move formatted property to the row creation map
   * => reduce memory usage
   */

  /**
   * since rows only depend on sortedBalances and prices, we can limit the calculation by memorizing rows with those two dependencies
   * => it reduce the number of re-render when there's change.
   * For example: when balances changed, React will compute sortedBalances and since rows didn't memoized, it will be re-compute 2 times.
   * -> when we memoized it with [sortedBalances, prices], when balances changes, rows only be compute once when sortedBalances is calculated.
   */
  const rows = useMemo(() => {
    return sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      balance.formatted = balance.amount.toFixed()
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  }, [sortedBalances, prices]);

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}