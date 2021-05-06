do (
  def(x, object ( 
    c:   0,
    gc:  ->{self.c},
    sc:  ->{value, =(self, "c", value)},
  )),
  println(x["c"]),           // 0
  println(x.c),              // 0
  println(x.gc()),           // 0 calls the function!
  x.sc(5),
  println(x.gc()),           // 5
  x["sc"](9),
  println(x.gc())            // 9
)
