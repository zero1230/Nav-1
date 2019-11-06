const str=localStorage.getItem('x')
const xObject=JSON.parse(str)
console.log(str)
const hashMap=xObject||[
    {"logo":"A","url":"https://www.acfun.cn"},
    { "logo": "B",  "url": "https://www.bilibili.com" }
]
const $last = $('.lastLi')

const simpleUrl=(url)=>{
    return url.replace('https://','').replace('http://','').replace('www.','').replace(/\/.*/,'')//删除以/结尾的字符串
    
}

// 存网站的思路 1.网站离开的时候存 2.重新加载读取
const render=()=>{
    $('.siteList').find('li:not(.lastLi)').remove()
    hashMap.forEach((node,index) => {
        const $li = $(`<li>
                
                    <div class="site">
                        <div class="logo">
                            ${node.logo[0]}
                        </div>
                        <div class="link">${simpleUrl(node.url)}</div>
                        <div class="close">
                        <svg class="icon" >
                        <use xlink:href="#icon-wrong"></use>
                        </svg>
                        </div>
                    </div>
            </li>`).insertBefore($last)
            $li.on('click',()=>{
                window.open(node.url)
            })
            $li.on('click','.close',(e)=>{
                e.stopPropagation() //阻止冒泡事件
                hashMap.splice(index,1) //删除对应的
                render()
            })
    })

}

render()




$('.addButton').on('click',()=>{
    let url=window.prompt('请输入新增网站')
    
    if(url.indexOf('http')!==0){
        url='https://'+url
    }
    console.log(url)
    hashMap.push({"logo":simpleUrl(url)[0].toUpperCase(),"url":url})
    
    render()
})

window.onbeforeunload=()=>{
    const string=JSON.stringify(hashMap)
    localStorage.setItem('x',string)
    
    
}

$(document).on('keypress',(e)=>{
    let {key}=e
    console.log(key)
    for(let i=0;i<hashMap.length;i++){
        if (hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
            break
        }
    }
})