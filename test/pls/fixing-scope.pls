run(
    let(x, 4),
    let(assignx, fn(val, 
        assign(x, val)
    )),
    assignx(50),
    x
)