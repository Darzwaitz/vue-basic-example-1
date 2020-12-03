//alert('sup');
Vue.config.devtools = true
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
                <h1 class="product-title">{{title}}</h1>
                <div class="cart">
                    <p>Cart({{cart}})</p>
                </div>
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
                
            </div> <!-- / product-info -->

            
            <product-review @review-submitted="addReview"></product-review>

            <div class="reviews-container">
                <h2>Reviews</h2>
                <p v-if="!reviews.length">There are no reviews yet</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>{{ review.review }}</p>
                    </li>
                </ul>
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
            cart: 0,
            reviews: []
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
        },
        addReview: function(productReview){
            this.reviews.push(productReview)
        }         
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
Vue.component('product-review',{
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
    <b> Please correct the following error(s):</b>
    <ul>
        <li v-for="error in errors">{{ error }}</li>
    </ul>
    </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
    `,
    data(){
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit(){
            if(this.name && this.review && this.rating){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            }
            else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
            }
        }            
    }
})
let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }      
})