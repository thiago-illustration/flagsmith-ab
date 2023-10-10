import { useFlags } from 'flagsmith/react';

export default function Home() {
  const {
    "ab-test_btn-color": flag
  } = useFlags(["ab-test_btn-color"])

  const { enabled, value } = flag

  if (!enabled) return <p>DISABLED</p>
  if (value === 'red') return <p>RED</p>
  if (value === 'blue') return <p>BLUE</p>

  return <p>GREEN</p>
}
