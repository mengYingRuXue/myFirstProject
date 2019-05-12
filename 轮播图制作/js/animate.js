function animate(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        //计算移动的步长
        var step = (target - obj.offsetLeft) / 10
        step = step >= 0 ? Math.ceil(step) : Math.floor(step); //使用三元表达式更简洁
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer)
            callback && callback();
        } else {
            obj.style.left = obj.offsetLeft + step + 'px'
        }
    }, 15)
}