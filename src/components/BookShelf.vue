<template>
    <div class="bookShelf">
        <div v-for="book in books" :key="book.isbn" class="responsive">
            <div class="img">
            <a target="_blank" :href="book.pic" class="img">
                <img :src="book.pic" :alt="book.name"  />
            </a>
            <div class="desc" v-if="type==='admin'">
                <EditableCell input-type="text"
                              show="true"
                              :value="book.name"
                              type-desc="书名"
                              @submitValue="handleSubmit($event,book.isbn,'name')"
                />
                <br />
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
                <p>
                    <EditableCell input-type="number"
                                  show="true"
                                  :value="'￥'+book.price"
                                  type-desc="价格"
                                  @submitValue="handleSubmit($event,book.isbn,'price')"
                    />
                </p>
            </div>
                <div class="desc" v-else >
                    <p >{{book.name}}</p>
                    <p class='detail'>{{book.author}} 著
                        <br />
                        {{book.press}}
                        <br /></p>
                    <p class='price'>￥{{book.price}}</p>
                </div>
            </div>

        </div>
        <h1 v-if="noResult" class="noneResult">无搜索结果</h1>
    </div>
</template>

<script>
    import EditableCell from "@/components/EditableCell";
    export default {
        name: "BookShelf",
        components: {EditableCell},
        props:['initFilterText','initBookData','isRequestSearch','edit','mode'],
        data:function(){
            return {
                filterText:this.initFilterText,
                bookData:this.initBookData,
                books:[],
                noResult:false,
                isSearch:this.isRequestSearch,
                type:this.mode,
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
                const index=this.books.findIndex(
                    function (book) {
                        return book.isbn===isbn;
                    }
                )
                switch (type) {
                    case "name":
                        this.books[index].name=value;
                        break;
                    case "author":
                        this.books[index].author=value;break;
                    case "press":
                        this.books[index].press=value;break;
                    case "price":
                        this.books[index].price=value;break;
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
        width: auto;
        margin: auto;
        max-height: 600px;
        border: 1px solid #ccc;
    }

    div.img:hover {
        border: 1px solid #777;
    }

    div.img img {
        margin: auto;
        width: auto;
    }

    div.desc {
        padding: 15px;
        text-align: center;
    }

    * {
        box-sizing: border-box;
    }

    .responsive {
        float: left;
        width: 210px;
        margin: 6px 6px;
    }
.noneResult{
    position: relative;
    top:50px;
}
</style>