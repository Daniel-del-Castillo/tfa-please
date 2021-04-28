do(
    let(x, array(1,2,3,4)),
    let(inc, fn(x,i,g, +(x,1))),
    println(x["map"](inc))
)
