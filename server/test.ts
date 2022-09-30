interface A {
  a: string
  // b: number
}
interface B {
  a: string
  b: number
}
type C = A extends B ? 1:2

let c:C = 2

