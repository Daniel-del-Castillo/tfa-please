run(
    let(x, 1),
    while(!=(x, 2), 
        assign(x, +(x, 1))
    ),
)