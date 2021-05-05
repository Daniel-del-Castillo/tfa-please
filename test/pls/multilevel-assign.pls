do(
  def(x, array(1, 3, array(7))),
  assign(x, 1, 9),
  assign(x, 2, 0, 1000),
  println(x)              // [ 1, 9, [1000]]
)
