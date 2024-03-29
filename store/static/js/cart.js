var cartbtns = document.getElementsByClassName('update-cart')

for (let i = 0; i < cartbtns.length; i++) {
    cartbtns[i].addEventListener('click',function(){
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('productId',productId,'action',action)

        if(user === 'AnonymousUser'){
            addCookieItem(productId,action)
        }else{
            updateUserOrder(productId,action)
        }
    })
    
}

function addCookieItem(productId,action){
    console.log('User is not authenticated!')

    if (action == 'add'){
        if (cart[productId] == undefined){
            cart[productId] = {'quantity':1}
        }else{
            cart[productId]['quantity'] += 1
        }
    }
    if (action == 'remove'){
        cart[productId]['quantity'] -= 1

        if (cart[productId]['quantity']<=0){
            console.log('remove item')
            delete cart[productId]
        }
    }
    console.log('Cart: ',cart)
    document.cookie = 'cart='+ JSON.stringify(cart) + ";domain=;path=/"
    location.reload()
}

function updateUserOrder(productId,action){
    console.log('User is logged in, sending data...')
    url = '/update_item/'

    fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/Json',
            'X-CSRFToken':csrftoken
        },
        body:JSON.stringify({'productId':productId,'action':action})
    })
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log('data:',data)
        location.reload()
    })
}