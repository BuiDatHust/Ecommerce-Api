const validateBody = (obj, id) => {
    let val ={}
    Object.keys(obj).forEach((key,index) => {
        if(obj[key]!==undefined && key!==id ) val[key] = obj[key]
    })

    return val 
}

module.exports= validateBody