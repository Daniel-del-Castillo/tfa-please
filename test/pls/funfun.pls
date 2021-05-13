do(
  def(f, fn(x, fn(y, +(x,y)))),
  println(f(2)(4)) // 6
)