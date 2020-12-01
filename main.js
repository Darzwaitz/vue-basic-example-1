//alert('sup');
Vue.component('product',{
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
            <div class="productImageBox">
                <div class="product-image"
                            :style="{backgroundImage: 'url(' + image + ')'}">
                    <!-- <img v-bind:src="image" alt=""> -->
                </div>   
            </div><!-- productImageBox -->   
            <div class="product-info">
                <h1>{{title}}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else>Out of Stock</p>
                <!-- v-show will toggle the element - its display none if false -->
                <!-- keeps the element in the DOM -->
                <!-- <p v-show="inventory">Total left: {{inventory}}</p> -->

                <p>Shipping: {{ shipping }}</p>

                
                <h2>{{description}}</h2>
                <ul class="product-list">
                    <li v-for="detail in details">{{detail}}</li>
                </ul>
                <!-- iterate a list using the ID and using key to bind -->
                <!-- 2 divs rendered for colour -->
                <div v-for="(variant, index) in variants" 
                    :key="variant.variantId"
                    class="colour-box"
                    :style="{backgroundColor: variant.variantColour}"
                    @mouseover="updateProduct(index)">
                    <!-- <p>{{variant.variantColour}}</p> removed-replaced with coloured div box-->
                    <!-- @ is shorthand for v-on -->
                </div>

                <button v-on:click="addToCart"                         
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }">Add to cart</button>
                <button v-on:click="zeroCart">Zero the cart</button>
                <div class="cart">
                    <p>Cart({{cart}})</p>
                </div>
            </div>
        </div>
    `,
    data(){
        return {
            brand: 'Darzwool',
            product: 'Sox',
            description: 'This iz the description',
            selectedVariant: 0,
            // inventory: 2,   
            details: ["80 cotton","20% polyester","100% comfy!"],
            variants: [
                {
                    variantId: 01, 
                    variantColour: "Burlywood",
                    variantImage: 'https://images.pexels.com/photos/251454/pexels-photo-251454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                    variantQuantity: 8
                },
                {
                    variantId: 02,
                    variantColour: "Fuchsia",
                    variantImage: 'https://images.pexels.com/photos/1117485/pexels-photo-1117485.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                    variantQuantity: 0
                }
            ],
            cart: 0
        }
    },
    methods: {
        addToCart: function(){
            this.cart +=1
        },
        zeroCart: function(){
            this.cart = 0
        },
        //ES6 function
        updateProduct(index){
            this.selectedVariant = index
            // console.log(index)
        }
        // ,
        // inStockTrigger(inStock) {
        //     if(inventory <= 0)
        //     {inStock = false;}
        //   }            
    },
    computed: {
        title(){
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping(){
            if(this.premium){
                return "Free"
            }
            return "2 quid"
        }
    }
})
let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }      
})