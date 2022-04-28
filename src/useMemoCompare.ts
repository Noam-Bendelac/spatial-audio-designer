import { useRef } from 'react'


// source: https://usehooks.com/useMemoCompare/
export const useMemoCompare = <T> (
  next: T,
  compareEqual: (previous: T | undefined, next: T) => boolean
) => {
  // Ref for storing previous value
  const previousRef = useRef<T>()
  // save a reference to the previous
  const previous = previousRef.current
  
  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const isEqual = compareEqual(previous, next)
  
  // If not equal update previousRef to next value.
  // We only update if not equal so that this hook continues to return
  // the same old value if compare keeps returning true.
  if (!isEqual) {
    previousRef.current = next
  }
  
  // Finally, if equal then return the previous value
  // unless this is the first call
  return previous === undefined
    ? next
    : isEqual ? previous : next
}
