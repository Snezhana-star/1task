



 Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    }, 
    
    template: `
 <div class="product">
    <div class="product-image">
        <img :src="image" :alt="altText"/>
    </div>
    <div class="product-info">
        <h1>{{ title}}</h1>
        <p v-if="inStock">In stock</p>
        <p v-else class="textDecoration ">Out of Stock</p>
        <p>{{ sale}}</p>
        <product-details></product-details>
        <p>Shipping: {{ shipping }}</p>
        <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId" :style="{ backgroundColor:variant.variantColor }" 
        @mouseover="updateProduct(index)">
        </div>
        <div class="cart">
            <p>Cart({{ cart }})</p>
        </div>
        <button @click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to cart</button>
        <button v-if="cart > 0" @click="deleteToCart">Delete to cart</button>
        <button v-else class="disabledButton">Delete to cart</button>
    </div>
 </div>
`,
data() {
    return {
        product: "Socks",
        brand: 'Vue Mastery',
        selectedVariant: 0,
        altText: "A pair of socks",
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0
            }
        ],
        cart: 0,
        onSale: true
    }
},
methods: {
    addToCart() {
        this.cart += 1
    },
    updateProduct(index) {
        this.selectedVariant = index;
        console.log(index);
     },
    deleteToCart(){
        this.cart = this.cart - 1
    } 
},
computed: {
    title() {
        return this.brand + ' ' + this.product;
    },
    image() {
        return this.variants[this.selectedVariant].variantImage;
     },
    inStock(){
        return this.variants[this.selectedVariant].variantQuantity
    },
    sale(){
        if (this.onSale){
            return this.brand + ' ' + this.product + ' ' + " on sale";
        }
        
    },
    shipping() {
        if (this.premium) {
            return "Free";
        } else {
            return 2.99
        }
     }
     
}
})

Vue.component('product-details',{
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
 `,
 data(){
    return{
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
    }
 }
})

 
let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})