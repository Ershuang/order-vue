<template>
<div class="shopCart">
  <div class='left'  @click="listToggle">
    <div class='icon' >
      <img src='/static/img/shopCart.png' >
      <div class="badge" v-show='totalCount'>
        {{totalCount}}
      </div>
    </div>
    <div class='priceTotal'><p>￥{{priceTotal}}</p></div>
    <div class='priceOld'><span>原价</span></div>
  </div>
  <div class='right'>
    <div class="ready">点好了</div>
  </div>
  <transition name='transHeight'>
    <div class='shopcart-list' v-show='listShow'>
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click='setEmpty()'>清空</span>
      </div>
      <div class="list-content" ref='foodlist'>
        <ul>
          <li class="food" v-for='food in selectFoods'>
            <span class="name">{{food.name}}</span>
            <div class='price'>
              <span>￥{{food.price * food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper" style='right:45px;'>
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>

</div>

</template>
<script>

import BScroll from 'better-scroll'
import cartcontrol from '../components/cartcontrol'
export default{
  props:{
    selectFoods:{
      type:Array,
      default:[]
    }

  },
  data(){
    return{
      listShow:false
    }
  },
  created(){
    // this.$root.eventHub.$on('cart.add',this.drop)
  },
  computed:{
    totalCount(){
      let count = 0
      this.selectFoods.forEach((food)=>{
        count += food.count
      })
      return count
    },
    priceTotal(){
      let priceTotal = 0
      this.selectFoods.forEach((food)=>{
        if(food.count){
          priceTotal += food.price * food.count
        }
      })
      return priceTotal
    }
  },
  methods:{
    listToggle(){
      console.log("@@@")
      if(!this.selectFoods.length){
        return
      }
      this.listShow = !this.listShow
      if(this.listShow){
        this.$nextTick(()=>{
          if(!this.foodlistScroll){
            this._initScroll()
          }else{
            this.foodlistScroll.refresh()
          }
        })
      }
    },
    _initScroll(){
      this.foodlistScroll = new BScroll(this.$refs.foodlist,{
        click:true
      })
    },
    setEmpty(){
      this.selectFoods.forEach((food)=>{
        food.count =0
      })
    }
  },

  components:{
    cartcontrol
  }
}
</script>
 <style>
.shopCart{
  position:fixed;
  bottom:0;
  width: 100%;
  height: 60px;
  background: #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.shopCart .left{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left:15px;
}
.badge{
  position:absolute;
  top:5px;
  left:35px;
  background: rgb(240,20,20);
  color:#fff;
  width: 24px;
  height: 16px;
  line-height: 16px;
  font-size:9px;
  box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
  font-weight: 700;
  border-radius: 16px;
  text-align: center;

}
.shopCart .right{
  width: 120px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color:#fff;
  background: #ee6062;
  font-size:16px;
}

.transHeight-enter-active, .transHeight-leave-active{
  transition: all 0.5s;
}
.transHeight-enter, .transHeight-leave-active{
  transform:  translate3d(0,0,0);
}
.shopcart-list{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  background: #fff;
  transform: translate3d(0,-100%,0);
  z-index:-20;
}
.list-header{
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:1px solid rgba(7,17,27,0.1);
}

.list-header .title{
  font-size:14px;
  font-weight: 200;
  color:rgb(7,17,27);
  padding-left:18px;
}
.list-header .empty{
  font-size:12px;
  color:rgb(0,160,220);
  padding:0 10px;
}
.list-content{
  max-height: 217px;
  overflow: hidden;
}
.list-content .food{
  position:relative;
  display: flex;
  height: 48px;
  margin:0 18px;
  border-bottom:1px solid rgba(7,17,27,0.1);
}
.name{
  flex:1;
  font-size:14px;
  color:rgb(7,17,27);
  line-height: 48px;
  font-weight: 700;
}
.price{
  font-size:14px;
  font-weight: 700;
  color:rgb(240,20,20);
  padding:0 12px 0 18px;
  line-height: 48px;
}
.cartcontrol-wrapper{
  font-size:14px;
  margin-top:6px;
}


 </style>
