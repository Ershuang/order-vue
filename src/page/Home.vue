<template>
  <div class="container">
    <div class="menu-warpper" ref='menuWarpper'>
      <ul>
        <li v-for='(item,index) in goods' @click="menuClick(index,$event)" :class="index==menuCurrentIndex?'menu-item-selected':'menu-item'">
          <span class="text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-warpper" ref='foodsWarpper'>
      <ul>
        <li v-for='item in goods' class="food-list food-list-hook">
          <h1>{{item.name}}</h1>
          <ul>
            <li v-for='food in item.foods' class='food-item'>
              <div class='icon'>
                <img width='50' height="50">
              </div>
              <div class="content">
                <h2>{{food.name}}</h2>
                <p class='description' v-show='food.description'>{{food.description}}</p>
              </div>
              <div class='price'>
                <span class="newPrice"><span class="unit">￥</span>{{food.price}}</span>
                <span v-show='food.oldPrice' class="oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <div class='cartcontrol-wrapper'>
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart :selectFoods="selectFoods"></shopCart>

  </div>
</template>
<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import cartcontrol from '../components/cartcontrol'
import shopCart from '../components/shopCart'
export default{

  data(){
    return{
      goods:[],
      listHeight:[],
      foodsScrollY:0,
      selectedFood:'',
      foodsScroll:''
    }
  },
  created(){
    axios.get('static/data.json').then((res)=>{
      this.goods = res.data.goods;
      this.$nextTick(()=>{
        this._initScroll();
        this._calculateHeight();
      })
    })
  },
  methods:{
    _initScroll(){
      // console.log('initScroll');
      let menuWrapper = new BScroll(this.$refs.menuWarpper,{
        click:true
      });
      let foodsScroll = new BScroll(this.$refs.foodsWarpper,{
        click:true
      });
      this.foodsScroll = foodsScroll;
      foodsScroll.on('scroll',(pos)=>{
        // console.log('scroll'+this.foodsScrollY)
        this.foodsScrollY = Math.abs(Math.round(pos.y))
      })

    },
    _calculateHeight(){
      let foodList = document.querySelectorAll('.food-list-hook')
      let height = 0;
      for(let i = 0,l = foodList.length; i < l;i++){
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height);
      }
      console.log(this.listHeight)
    },

    menuClick(index,event){
      if (!event._constructed) {
        return
      }
      this.foodsScroll.scrollTo(0, -this.listHeight[index-1])
    }

  },
  computed: {
    menuCurrentIndex() {
      for (let i = 0, l = this.listHeight.length; i < l; i++) {
        let topHeight = this.listHeight[i]
        let bottomHeight = this.listHeight[i + 1]
        // console.log(this.foodsScrollY)
        if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
          return i

        }
      }
      return 0
    },
    selectFoods() {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  components:{
    cartcontrol,
    shopCart


  }
}
</script>
<style>
.container{
  width:100%;
  min-height: 100vh;
  display: flex;
}
.menu-warpper{
  height: 30rem;
  width:10rem;
  overflow: hidden;
  flex:  0 0 5rem;
  width:5rem;
  background: #f3f5f7;
}
.menu-item-selected{
  background-color: #fff;
  font-weight: 70;
  margin-top:-1;
}
.menu-item, .menu-item-selected{
  position:relative;
  display:table;
  height: 54px;
  line-height: 14px;
  width:54px;
  padding:0 12px;
}
.menu-item:after{
  position:absolute;
  content:'';
  left:12px;
  width:56px;
  bottom:0;
  border-bottom:1px solid rgba(7,17,27,0.1);
}
.foods-warpper{
  height: 100vh;
  overflow: hidden;
}
.text{
  display: table-cell;
  vertical-align: middle;
  font-size:12px;
  font-weight: 200;
  white-space: normal;
  line-height: 14px;
}
.foods-warpper{
  flex:1;
  margin-top: 2px;
}
.food-list h1{
  height: 26px;
  line-height: 26px;
  padding-left:12px;
  font-size:12px;
  color:rgb(147,153,159);
  background:#f3f5f7;
  border-left:2px solid #d9dde1;
}
.food-item{
  position: relative;
  display: flex;
  margin:0 18px;
  padding:18px 0;
  border-bottom:1px solid rgba(7,17,27,0.1);
}
.content{
  flex:1;
  padding-left:10px;
}
.content h2{
  font-size:16px;

}
.content p{
  margin:2px 0 8px 0;
  font-size:14px;
  line-height: 14px;
  height: 14px;
  font-weight: 700;
  color:rgb(7,17,27);
}
.sell-info, .description{
  font-size: 10px;
  color:rgb(147,153,159);
  line-height: 10px;
}
.sellCount{
  margin-right: 4px;
}
.description{
  font-size:10px;
  margin-bottom:8px;
  line-height: 12px;
}
.price{
  font-size:10px;
  font-weight: 700;
  line-height: 24px;
}
.newPrice{
  font-size:14px;
  color:rgb(240,20,20);
}
.unit{
  font-size:10px;
  font-weight: normal;
}
.oldPrice{
  text-decoration: line-through;
  color:rgb(147,153,159);
  padding-left:4px;
}
.cartcontrol-wrapper{
  position:absolute;
  right: 0;
  bottom:12px;
  z-index:20;
}
</style>
