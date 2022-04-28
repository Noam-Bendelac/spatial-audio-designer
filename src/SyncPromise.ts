
/**
 * allows synchronously getting the state and value (if resolved) of a promise
 * this is needed to avoid excessive react rerenders
 */
export class SyncPromise<T, E = any> {
  promise: Promise<T>
  state: SyncPromise.State = 'pending'
  
  private value_: T | E | null = null
  
  constructor(promise: Promise<T>) {
    this.promise = promise
    this.promise.then(
      (t) => { this.state = 'resolved'; this.value_ = t },
      (e: E) => { this.state = 'rejected'; this.value_ = e }
    )
  }
  
  ifResolved() {
    if (this.state === 'resolved') return this.value_ as T
    else return null
  }
}

namespace SyncPromise {
  export type State = 'pending' | 'resolved' | 'rejected'
}

