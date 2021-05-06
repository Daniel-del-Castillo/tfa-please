do {
  :=(d, r/
         (?<year>  \d{4} ) -?  # year
         (?<month> \d{2} ) -?  # month
         (?<day>   \d{2} )     # day
        /x),
  println(d["test"]("1987-07-14")),  // true
  :=(m, d["exec"]("1987-07-14")),
  println(m[0]), //  '1987-07-14'
  println(m["index"]), // 0

  :=(x, XRegExp["exec"]("2015-02-22", d)),
  println(x.groups.year), // 2015
  println(x.groups.month) // 02
}