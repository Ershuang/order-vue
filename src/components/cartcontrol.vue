<template>
  <div class='cartcontrol'>
    <transition name='fadeRotate'>
      <div class='cart-decrease' v-show='food.count>0' @click.stop.prevent = 'decreaseCart()'>
        <span class="icon-remove_circle_outline inner">-</span>
      </div>
    </transition>
    <div class='cart-count' v-show='food.count>0'>
      {{food.count}}
    </div>
    <div class="cart-add" @click.stop.prevent='addCart($event)'>
      <span class="icon-add_circle">+</span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default{
  props:{
    food:Object
  },
  data(){
    return{

    }
  },
  methods:{
    addCart(event){
      if(!event._constructed){
        return
      }
      if(!this.food.count){
        Vue.set(this.food,'count',0)
      }
      this.food.count++;
      this.$root.eventHub.$emit('cart.add', event.target)
    },
    decreaseCart(){
      if(!event._constructed || !this.food.count){
        return
      }
      this.food.count--
    }
  }
}
</script>
<style>
.cartcontrol{
  display: flex;
  justify-content: center;
  align-items: center;
}
.cartcontrol .cart-decrease{
  padding:6px;
  display: inline-block;
  transition:all .2s linear;
}
.inner{
  font-size:24px;
  line-height: 24px;
  color:#999;
  transition:all .2s linear;
}
.cart-count{
  display: inline-block;
  vertical-align: top;
  font-size:10px;
  color:#999;
  line-height: 24px;
  text-align: center;
  padding:6px 0;
}
.cart-add{
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  font-size:24px;
  color:#999;
  line-height: 24px;
  padding:6px;
}
</style>
