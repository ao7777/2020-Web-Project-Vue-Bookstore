<template>
    <b-container style="background: #FFFFFF;border: 0.1rem #6c757d">
        <transition
                enter-active-class="animated bounceIn"
                leave-active-class="animated bounceOut"
                name="custom-classes-transition"
        ><b-row class="manageCell" v-if="$router.currentRoute.path!=='/manage/book/addBook'">
            <router-link to="/manage/book/addBook"  class="plusButton" >
                <i class="fas fa-plus-circle" style="font-size: 60px"/>
            </router-link>

        </b-row>

        </transition>
            <router-view ></router-view>

        <b-card-group columns>
            <b-card :title="book.name"
                    :sub-title="'ISBN:'+book.isbn"
                    v-for="book in books"
                    :key="book.isbn"
                    style="max-width: 400px"
                    bg-variant="dark"
                    text-variant="white"
            >
                        <b-card-img-lazy :src="'http://localhost:8070'+book.pic+'.jpg'" style="height: 80%" class="rounded-0" :alt="book.name"/>

                        <b-card-text >
                                {{book.author}} 著
                            <br/>
                            {{book.press}}
                        </b-card-text>
                <template v-slot:footer>
                    销量:{{book.sales}}本  库存：{{book.storage}}本
                    <a @click.prevent="handleDel(book.isbn)" href="#" title="删除图书" class="deleteButton">
                        <i class="fas fa-times"/>
                    </a>
                </template>
            </b-card>
        </b-card-group>
    </b-container>
</template>

<script>
    import server from "@/http/request.js"
    export default {
        name: "BookManage",
        data:function(){
            return{
              showAdd:false,
            bookData:JSON.parse(localStorage.getItem('books')),
                books:[]
            };
        },
        created:function(){
            this.refreshBooks()
        },
        methods:{
          handleDel:function(isbn){
              this.$dialog.confirm('删除此图书？',{
                  loader:true
              }).then(
                  (dialog)=>
              {
                  server.post('/BookDelete', {
                          isbn: isbn,
                      }
                  ).catch(
                      function (error) {
                          console.log(error);
                      }
                  ).then(()=>{
                      dialog.close();
                      this.$dialog.alert("删除成功")
                  });
                  const index = this.books.findIndex(
                      function (book) {
                          return book.isbn === isbn;
                      }
                  );
                  this.books.splice(index, 1);
                  localStorage.setItem('books',JSON.stringify(this.books));
                  dialog.close()
              })
          },
            refreshBooks:function () {
                this.books.splice(0,this.books.length);
                let cnt=0;
                this.bookData.forEach(
                    (book)=> {
                        if((book.name.indexOf(this.filterText)!==-1||
                            book.author.indexOf(this.filterText)!==-1||
                            book.isbn.indexOf(this.filterText)!==-1||
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
            },
        handleAdd:function(){
              this.$emit('addBook');
        }
        },
        computed:{
          filterText:function(){
              return this.$store.state.filterText;
          }
        },
        watch:
            {
                filterText: function () {
                    this.refreshBooks();
                },
            },
    }
</script>

<style scoped>
.manageCell{
    position: relative;
}
.plusButton{
    color: #6c757d;
    opacity: 1;
    transform: scale(1);
    transition: color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    -webkit-tap-highlight-color: transparent;
    float: right;
    margin: auto;
    padding: 8px;
}
.plusButton:hover{
    color: #2c3e50;
}
.deleteButton{
    color: #6c757d;
    opacity: 1;
    transform: scale(1);
    transition: color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    -webkit-tap-highlight-color: transparent;
    float: right;
}
.deleteButton:hover{
    color: #FFFFFF;
}
</style>