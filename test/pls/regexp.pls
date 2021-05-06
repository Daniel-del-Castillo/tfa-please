do {
    :=(r, r/(\w+)
           \s+
           (\d+) 
          /x),
    :=(s, r.test("a 4")), // true
    :=(m, r.exec(";;; a 42")), 
    println(s),
    println(m),
}