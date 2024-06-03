// define global interface on Ags namespace
//
declare global {
  namespace Ags {
    interface Variable<T> {
      value: T,
    }
  }
}
