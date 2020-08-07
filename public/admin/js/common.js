function serializeToJson (from){
    var result = {};
    // [{name:'email',value:'用户输入的内容'}]
    var f = from.serializeArray();
    f.forEach(function(item){
        //result.email
        result[item.name] = item.value;
    });
    return result;
};