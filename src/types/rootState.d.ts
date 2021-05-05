import { RootState } from '../store/rootReducer'

declare module 'react-redux' {
  // typeだとうまく動作しないのでextendsする
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends RootState {}
}
