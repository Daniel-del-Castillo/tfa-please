do {
  def(x, arr(1, 2, 3)),
  foreach(x, x, println(x)), // Different x from inner and outer scope
}