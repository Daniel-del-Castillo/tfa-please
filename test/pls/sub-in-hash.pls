do(
  def(x, map{a: 1, b: 4, c: map{d: 5, e: 3}}),
  println(x["sub"]("a")),      // 1
  println(x["sub"]("c", "d")), // 5
  println(x["sub"]("c")["e"]), // 3
  println(x["sub"]("b"))       // 4
)    