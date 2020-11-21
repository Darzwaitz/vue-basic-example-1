//alert('sup');
let app = new Vue({
    el: '#app',
    data: {
        product: 'Sox',
        description: 'This iz the description',
        image: 'https://images.pexels.com/photos/251454/pexels-photo-251454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        inStock: true,
        inventory: 2,
        details: ["80 cotton","20% polyester","100% comfy!"],
        variants: [
            {
                variantId: 01,
                variantColour: "Green"
            },
            {
                variantId: 02,
                variantColour: "Blue"
            }
        ]
    }
})