<template>
        <div  :class="['searchBar',show?'showing':'']">
<!--            <img class="icon" :src="iconPic" alt=""/>-->
            <label class="inputContainer">
                <i class="fas fa-search"></i>
                <input
                        class="searchInput"
                        :placeholder="filterText===''?'搜索':filterText"
                        v-model="filterText"
                        @keypress.enter="handleSubmit"
                        @focus="isFocus=true"
                        @blur="isFocus=false"
                        type="text" />
            </label>
            <PeekResult
                        :filterText="filterText"
                        :book-data="books"
            />
        </div>
</template>

<script>
    import PeekResult from "@/components/PeekResult";
    import iconPic from "../assets/searchicon.png"
    export default {
        name: "SearchBar",
        props:['show'],
        data:function () {
        return{
                iconPic,
            isPeeking:false,
            filterText:"",
            isFocus:false,
            bookData:JSON.parse(localStorage.getItem('books')),
            books:[]
            }
        },
        components:{PeekResult},
        watch:
            {
                filterText: function () {
                    this.isPeeking=true;
                    this.refreshBooks();
                },
                isFocus:function (newf) {
                    if(newf===false){
                        this.$emit("cancelSearch");
                        this.filterText='';

                    }
                }
            },
        methods:{
            handleSubmit:function () {
                this.isPeeking=false;
                this.$store.commit('filter',this.filterText);
            },
            refreshBooks:function () {
                this.books.splice(0,this.books.length);
                this.bookData.forEach(
                    (book)=> {
                        let cnt=0;
                        if((book.name.indexOf(this.filterText)!==-1||
                            book.author.indexOf(this.filterText)!==-1||
                            book.isbn.indexOf(this.filterText)!==-1||
                            book.press.indexOf(this.filterText)!==-1)&&cnt<3&&
                            this.books.indexOf(book)===-1&&
                            this.filterText!==''
                        )
                        {
                            cnt++;
                            this.books.push(book);
                        }
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .searchBar{
        visibility: hidden;
        opacity: 0;
        border-radius: .4rem;
        position: absolute;
        width: 600px;
        top:3px;
        left: 50%;
        height: 44px;
        transform: translateX(0);
        margin: auto;
        padding: 0;
    }
    .showing{
        opacity: 1;
        visibility: visible;
        transition-delay: 1s;
        transition: 1.5s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform: translateX(-40%);

    }
    .fa-search{
        top: 10px;
        display: block;
        position: relative;
        color: #cccccc;
    }
    .searchInput{
        width: 70%;
        color: #FFFFFF;
        margin:0;
        padding: 6px;
        border: 0;
    }

    ::placeholder{
        opacity: 0.7;
        color: #FFFFFF;
    }
    label.inputContainer{
        display: flex;
        margin-left: auto;
        margin-bottom: 3px;
    }
</style>