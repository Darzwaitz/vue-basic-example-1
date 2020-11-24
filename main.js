//alert('sup');
let app = new Vue({
    el: '#app',
    data: {
        product: 'Sox',
        description: 'This iz the description',
        image: 'https://images.pexels.com/photos/251454/pexels-photo-251454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
         inventory: 0,
         inStock: true,
       
        details: ["80 cotton","20% polyester","100% comfy!"],
        variants: [
            {
                variantId: 01,
                variantColour: "Burlywood",
                variantImage: 'https://images.pexels.com/photos/251454/pexels-photo-251454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            },
            {
                variantId: 02,
                variantColour: "Fuchsia",
                variantImage: 'https://images.pexels.com/photos/1117485/pexels-photo-1117485.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            }
        ],
        cart: 0
    },
    methods: {
        addToCart: function(){
            this.cart +=1
        },
        zeroCart: function(){
            this.cart = 0
        },
        //ES6 function
        updateProduct(variantImage){
            this.image = variantImage
        },
        inStockTrigger(inStock) {
            if(inventory <= 0)
            {inStock = false;}
          }            
    }
      
})