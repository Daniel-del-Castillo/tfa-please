do {
  def(x, object {
    c, 0,
    "gc",  ->{element(self, "c")},
    "sc",  ->{value, =(self, "c", value)},
    "inc", ->{=(self, "c", +(element(self, "c"),1))}
  }),

  println(x["gc"]()), // 0
  x["sc"](4),
  println(x["gc"]()), // 4
  x["inc"](),
  println(x["gc"]()), // 5
  println(x["c"]),    // 5
}
