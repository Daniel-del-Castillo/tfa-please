do(
  def(x, 7),
  for(def(x, 0), <(x, 5), def(x, +(x, 1)),
    println(x)
  ),
  println(x) // 7
)