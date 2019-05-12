window.addEventListener('load', function() {
    //获取焦点图事件源
    var focus = document.querySelector('.focus')
    var arrowl = document.querySelector('.arrow-l')
    var arrowr = document.querySelector('.arrow-r')
        //鼠标经过焦点图时触发
    focus.addEventListener('mouseover', function() {
        arrowl.style.display = 'block'
        arrowr.style.display = 'block'

        clearInterval(timer)
    })
    focus.addEventListener('mouseout', function() {
        arrowl.style.display = 'none'
        arrowr.style.display = 'none'
            // timer = setInterval(right, 2000)

    })
    var circle = focus.querySelector('.circle') //获取小圆圈事件源
    var ul = focus.querySelector('ul') //获取焦点图的事件源
    for (var i = 0; i < ul.children.length; i++) { //动态添加小圆圈
        var li = document.createElement('li')
        li.setAttribute('index', i)
        circle.appendChild(li)

        circle.children[0].className = 'current'
        circle.children[i].onclick = function() {
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = ''
            }
            this.className = 'current'
            var index = this.getAttribute('index')
            focus_num = index
            circle_num = index
            var length_right = -index * focus.offsetWidth
            animate(ul, length_right)
        }
    }
    var li = ul.children[0].cloneNode(true) //克隆第一个焦点图
    ul.appendChild(li) //添加到焦点图最后的位置
    var focus_num = 0; //设置变量
    var circle_num = 0;
    var flag = true; //设置节流阀避免事件重复触发
    arrowr.addEventListener('click', right)

    function right() { //右边按钮点击事件
        if (flag) {
            flag = false
            if (focus_num == ul.children.length - 1) { //当焦点图到达最后一张时,瞬间回到第一张焦点图
                ul.style.left = 0
                focus_num = 0
            }
            focus_num++
            var length_right = -focus_num * focus.offsetWidth //设置每次点击ul移动的距离
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = ''
            }
            if (focus_num == ul.children.length - 1) {
                circle_num = -1
            }
            circle_num++
            circle.children[circle_num].className = 'current'
            animate(ul, length_right, function() {
                flag = true
            })
        }


    }
    arrowl.addEventListener('click', function() { //左边边按钮点击事件
            if (flag) {
                flag = false
                if (focus_num == ul.children.length - 1) { //当焦点图到达最后一张时,瞬间回到第一张焦点图
                    ul.style.left = -focus.offsetWidth * (ul.children.length - 1) + 'px'

                } else if (focus_num == 0) {
                    ul.style.left = -focus.offsetWidth * (ul.children.length - 1) + 'px'
                    focus_num = 4
                }
                focus_num--
                var length_right = -focus_num * focus.offsetWidth //设置每次点击ul移动的距离
                for (var i = 0; i < circle.children.length; i++) {
                    circle.children[i].className = ''
                }
                if (circle_num == 0) {
                    circle_num = 4
                }
                circle_num--
                circle.children[circle_num].className = 'current'
                animate(ul, length_right, function() {
                    flag = true
                })
            }


        })
        //自动播放轮播图
    var timer = setInterval(right, 2000)
})