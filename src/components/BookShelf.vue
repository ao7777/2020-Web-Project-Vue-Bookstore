<template>
    <div class="bookShelf">
        <div v-for="book in books" :key="book.isbn"
             class="responsive" @mouseleave="hideInfo(book.isbn)"
             >
            <div class="img" >
            <a target="_blank" href="" class="img" @click.prevent="showInfo(book.isbn)">
                <img :src="'http://localhost:8090'+book.pic+'.jpg'" :alt="book.name"  />
            </a>
            <div class="desc" v-if="type==='admin'">

                <p><EditableCell input-type="text"
                              show="true"
                              :value="book.name"
                              type-desc="书名"
                              @submitValue="handleSubmit($event,book.isbn,'name')"
                />
                </p>

                <p class='detail'>
                    <EditableCell input-type="text"
                                  show="true"
                                  :value="book.author+' 著'"
                                  type-desc="作者"
                                  @submitValue="handleSubmit($event,book.isbn,'author')"
                    />
                    <br />
                    <EditableCell input-type="text"
                                     show="true"
                                     :value="book.press"
                                     type-desc="出版社"
                                     @submitValue="handleSubmit($event,book.isbn,'press')"
                />
                    <br />
                </p>
                <p class="price">
                    <EditableCell input-type="number"
                                  show="true"
                                  :value="'￥'+book.price/100.00"
                                  type-desc="价格"
                                  @submitValue="handleSubmit($event,book.isbn,'price')"
                    /> &nbsp;
                    <a class="buyButton" href="#" @click.prevent="handleAdd(book.isbn,$event)" title="加入购物车">
                        <i class="fas fa-kiwi-bird"></i>
                    </a>
                    <span class="storage">库存：{{book.storage}}本</span>
                </p>
            </div>
                <div class="desc" v-else >
                    <p >{{book.name}}</p>
                    <p class='detail'>{{book.author}} 著
                        <br />
                        {{book.press}}
                        <br /></p>
                    <p class='price'>￥{{book.price/100.0}}&nbsp;
                        <a class="buyButton" href="#" @click.prevent="handleAdd(book.isbn,$event)" title="加入购物车">
                            <i class="fas fa-kiwi-bird"></i>
                        </a>
                        <span class="storage">库存：{{book.storage}}本</span>
                    </p>
                </div>
            </div>
            <div :class="[book.show&&showingInfo?'bookInfo showing':'bookInfo']" >
                <span  v-html="bookInfo" class="InfoText"></span>

            </div>
        </div>
        <div class="ball-container">
            <transition name="fade" v-for="ball in balls" :key="ball.index" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                <div class="ball" v-show="ball.show">
                    <div class="inner inner-hook"></div>
                </div>
            </transition>
        </div>
        <h1 v-if="noResult" class="noneResult">无搜索结果</h1>
    </div>
</template>

<script>
    import EditableCell from "@/components/EditableCell";
    import server from '@/http/request'
    export default {
        name: "BookShelf",
        components: {EditableCell},
        props:['initFilterText','initBookData','isRequestSearch','edit','mode'],
        data:function(){
            return {
                filterText:this.initFilterText,
                bookData:this.initBookData,
                bookInfo:"",
                books:[],
                noResult:false,
                isSearch:this.isRequestSearch,
                type:this.mode,
                showingInfo:false,
                balls: [
                    {
                        show: false,
                        index:0
                    },
                    {
                        show:  false,
                        index:1
                    },
                    {
                        show:  false,
                        index:2
                    },
                    {
                        show:  false,
                        index:3
                    },
                    {
                        show:  false,
                        index:4
                    }
                ],
                dropBalls:[]
            }
        },
        created:function(){
          this.refreshBooks();
        },
        watch:
            {
                initFilterText: function () {
                    this.filterText=this.initFilterText;
                    this.refreshBooks();
                    this.isSearch=false;
                },
                mode:function(){
                    this.type=this.mode;
                }
            },
        methods:{
            handleSubmit:function(value,isbn,type){
                server.post('/BookUpdate',{
                        isbn:isbn,
                        type:type,
                        value:value
                }
                ).catch(
                    function(error){
                        console.log(error);
                    }
                );
                const index=this.books.findIndex(
                    function (book) {
                        return book.isbn===isbn;
                    }
                );
                this.bookData[index][type]=value;
            },
            showInfo:function (isbn){
               server.get('/BookInfo',{
                    params:{
                        isbn:isbn
                    }
                }).then(
                   (response)=>this.handleInfo(isbn,response)
               ).catch(
                   function(error){
                       console.log(error);
                   }
               );

            },
            hideInfo:function(isbn){
                const index=this.books.findIndex(
                    function (book) {
                        return book.isbn===isbn;
                    }
                );
                this.books.forEach((book)=>{
                    book.show=false;
                });
                this.books[index].show=false;
                this.showingInfo=false;
                this.bookInfo="";
            },
            handleInfo:function(isbn,response){
                        const index=this.books.findIndex(
                            function (book) {
                                return book.isbn===isbn;
                            }
                        );
                        this.bookInfo="<h4>"+this.books[index].name+"</h4>";
                        this.bookInfo+=response.data.book_description;
                        this.books.forEach((book)=>{
                            book.show=false;
                        });
                        this.books[index].show=true;
                        this.showingInfo=true;
            },
            handleAdd:function(isbn,event){
                this.$emit('addItem',isbn);
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) { //将false的小球放到dropBalls
                        ball.show = true;
                        ball.el = event.target; //设置小球的el属性为一个dom对象
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            },
            beforeEnter(el){ //这个方法的执行是因为这是一个vue的监听事件
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
                        let x = rect.left - 32;
                        let y = -(window.innerHeight - rect.top - 52); //负数,因为是从左上角往下的的方向
                        el.style.display = ''; //清空display
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                        el.style.transform = `translate3d(0,${y}px,0)`;
                        //处理内层动画
                        let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.transform = `translate3d(${x}px,0,0)`;
                    }
                }
            },
            enter(el, done) { //这个方法的执行是因为这是一个vue的监听事件
                /* eslint-disable no-unused-vars */
                let rf = el.offsetHeight; //触发重绘html
                this.$nextTick(() => { //让动画效果异步执行,提高性能
                    el.style.webkitTransform = 'translate3d(0,0,0)';
                    el.style.transform = 'translate3d(0,0,0)';
                    //处理内层动画
                    let inner = el.getElementsByClassName('inner-hook')[0]; //使用inner-hook类来单纯被js操作
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.transform = 'translate3d(0,0,0)';
                    el.addEventListener('transitionend', done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
                });
            },
            afterEnter(el) { //这个方法的执行是因为这是一个vue的监听事件
                let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
                if (ball) {
                    ball.show = false;
                    el.style.display = 'none'; //隐藏小球
                }
            },
            refreshBooks:function () {
                this.books.splice(0,this.books.length);
                let cnt=0;
                this.bookData.forEach(
                    (book)=> {
                        if((book.name.indexOf(this.filterText)!==-1||
                            book.author.indexOf(this.filterText)!==-1||
                            book.press.indexOf(this.filterText)!==-1)&&
                            this.books.indexOf(book)===-1
                        )
                        {
                            cnt++;
                            this.books.push(book);
                        }
                    }
                );
                this.noResult=(cnt===0);
            }
        }
    }
</script>

<style scoped>
    div.img {
        height: 480px;
        border: 1px solid #ccc;
        float: left;
        width: 200px;
    }
    .bookInfo.showing{
        text-align: center;
        visibility: visible;
        position: relative;
        left: 200px;
        top:0;
        width: 220px;
        padding: 0;
        font-size: 11px;
        font-weight: normal;
        height: 480px;
        color: #FFFFFF;
        background: rgba(60, 60, 60, 0.8);
        backdrop-filter: saturate(200%) blur(20px);
        transition: width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
    .bookInfo{
        visibility: hidden;
        width: 10px;
        height: 460px;
    }
    .InfoText{
        width: auto;
        position: absolute;
        line-height: 20px;
        left: 0;
        padding: 5px;
        transition: all 0.4s 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
    div.img img {
        height: 290px;
        width: 200px;
    }
    div.desc {
        padding: 15px;
    }
    div.desc p{
        height:40px;
    }
    * {
        box-sizing: border-box;
    }

    .responsive {
        width: 200px;
        margin: 6px 6px;
        height: auto;
        transition: all 0.2s ease-out;
    }
    .responsive:hover{
        box-shadow: 0 35px 77px -17px rgba(0,0,0,0.64);
        transform: translateY(-15px) ;
    }
    div.bookShelf{
        align-items: baseline;
        display: flex;
        flex-wrap:wrap;
        align-content:space-evenly;
        justify-content: space-evenly;
        margin: auto;
        width: 70%;
    }
    .storage{
        position: relative;
        float: right;
        font-size: small;
        bottom: 0;
    }
    .ball-container .ball{
        position:fixed;
        left: 32px;
        bottom: 22px;
        z-index:200;
        transition: all .6s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    }
    .ball-container .ball .inner{
        width:16px;
        height:16px;
        border-radius:50%;
        background: #2c3e50;
        transition: all .6s linear;
    }
.noneResult{
    position: relative;
    top:50px;
}
</style>