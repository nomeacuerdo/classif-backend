import { NumberInputProps, useFormValue } from 'sanity';
import { Stack, Text } from '@sanity/ui';

function formatPrice(price: number) {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function MoneyInput(props: NumberInputProps) {
  const price = useFormValue(['price']) as number | 0;

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      {typeof props.value === 'number' && price ? (
        <Text size={1}>
          {formatPrice(price)}
        </Text>
      ) : null}
    </Stack>
  )
}