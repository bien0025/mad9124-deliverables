function add(a ,b){
    return a+b;
}


test('happy path', ()=>{
    const res = add(1,2);

    expect(res).toBe(3);

});

function combinedObjects(obj1, obj2){
    Object.assign(obj1, obj2);
    return obj2;
}

test('correct result',() =>{
    const res = combinedObjects({a: 'A'},{b: 'B'});
    expect(res).toEqual({a: 'A', b: 'B'});
});

// test('mutate objects',() =>{
// const obj1 = {a: 'A'};
// const res = combinedObjects, (obj1, {b: 'B'});
// })

