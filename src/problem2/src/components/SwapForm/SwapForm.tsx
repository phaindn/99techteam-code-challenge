import { FormEvent, useCallback, useState } from 'react';
import s from './SwapForm.module.scss'
import { getTokensPrice } from '@/services/api'
import { tokenActions } from '@/store/reducers/tokens'
import CurrencyInput from '@/components/CurrencyInput/CurrencyInput'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { extractToken, sleep } from '@/utils'
import { LoadingIcon } from '../base/LoadingIcon/LoadingIcon';

function SwapForm() {
  const dispatch = useDispatch();
  const tokens = useSelector((state: RootState) => state.token.items);
  const [input, setInput] = useState(' ETH');
  const [output, setOutput] = useState(' USD');
  const [loading, setLoading] = useState(false);

  const getTokenInfo = useCallback((value: string) => {
    const { amount, currency } = extractToken(value);

    const tokenInfo = tokens.find(item => item.currency == currency);

    return {
      amount,
      currency,
      token: tokenInfo,
    }
  }, [tokens]);

  const swap = useCallback((input: string, output: string) => {
    const inputData = getTokenInfo(input);
    const outputData = getTokenInfo(output);
    const amount = inputData.amount * (inputData.token?.price || 1) / (outputData.token?.price || 1);
    
    return `${amount} ${outputData.currency}`;
  }, [getTokenInfo]);
  
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await getTokensPrice()
    await dispatch(tokenActions.addItems(res.data));
    await sleep(1000);
    
    const result = swap(input, output);
    setOutput(result)
    setLoading(false);
    return false;
  }

  return (
    <form className={s.container} onSubmit={onSubmit}>
      <h5>Swap</h5>
      <CurrencyInput
        defaultValue={input}
        placeholder="0.00"
        onChange={value => setInput(value)}
        label="Amount to send"
        />

      <CurrencyInput
        defaultValue={output}
        inputReadonly
        onChange={value => setOutput(value)}
        label="Amount to receive"
      />

      <button className={s.btn} disabled={loading}>
        {loading ? (
          <LoadingIcon />
        ) : (
          <span>CONFIRM SWAP</span>
        )}
      </button>
    </form>
  )
}

export default SwapForm;
