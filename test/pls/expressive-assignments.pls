do {
  def(x, map{x: 4, y: map{z: 3}}),
  =(x["y"]["z"], 50),
  =(x["3"][3]["z"], 50),
  println(x["y"])                   // { z: 50 }
}
