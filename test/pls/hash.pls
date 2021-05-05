do {
  def(x, map{"x", 4, "y", map{"z", 3}}),
  println(element(x, "y", "z")),            // 3
  set(x, "y", "z", 50),
  println(x),                               // { x: 4, y: { z: 3 } }
  println(element(x, "y"))                  // { z: 50 }
}
