run {
    let(a, 3),
    let(x, fn(assign(a, +(a, 3)))),
    // Can't propagate because multiple calls would change the value of a
    a, // Can propagate because x hasn't been called
    x(),
    a, // Here it shouldn't be propagated

    let(b, 3),
    let(y, fn(b)),
    // Technically possible to propagate in some cases, but can't be checked in one pass, because
    // there could be a sentence like the next one after the definition of the function
    assign(b, +(b, 1)), // the second b here should get propagated nonetheless

    let(d, 4),
    fn(assign(d, 3))(),
    d, // Can't propagate
    
    let(e, 5),
    while(<(e, 3), do { // Can't
        let(f, -(5, e)), // Can't
        =(e, 1),
    }),
    e, // Also can`t
    
    let(g, array(1)),
    let(h, 1),
    =(g[0], fn(1)),
    do {
        g[0](),
    },
    h, // We can't propagate because the function f[0] might have changed it
    // and we won't keep track of functions that aren't assigned to a variable
    // It could get realy complex keeping track of functions that return functions for example
    
    let(z, 1),
    let(y, fn(do {
        let(x, fn(assign(z, 3))),
        x(),
    })),
    y(),
    z, // Can't propagate
    
    let(a1, 1),
    let(a2, 1),
    let(a3, 3),
    if(true,
        do(assign(a3, fn(assign(a1, 2)))),
        assign(a3, fn(assign(a2, 3))),
    ),
    a1, // Can propagate
    a2, // Can propagate
    a3(),
    a1, // Can't propagate
    a2, // Can't propagate
    
}