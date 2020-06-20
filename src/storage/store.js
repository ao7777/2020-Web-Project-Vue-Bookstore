import Vue from 'vue'
import Vuex from 'vuex'
import server from "@/http/request";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        filterText:'',
        count: 0,
        cartItem:[],
        user:{type:'user'},
        loginStatus:false,
    },
    mutations: {
        increment (state,isbn) {
            state.count++;
            if(isbn!==''){
                let index=state.cartItem.findIndex(
                    (book)=>{
                        return book.isbn===isbn;
                    }
                );
                if(index!==-1){
                    state.cartItem[index].quantity++;
                }
                else
                    state.cartItem.push({
                        isbn:isbn,
                        quantity:1,
                        name:state.user.name
                    });
                server.post('/CartSubmit',{
                        order:state.cartItem,
                        ID:state.user.ID,
                        name:state.user.name,
                    }
                ).catch(
                    function(error){
                        console.log(error);
                    }
                );
            }
        },
        filter(state,filterText){
            state.filterText=filterText
        },
        clear(state){
            state.user={type:'user'};
            state.loginStatus=false;
        },
        login(state,data){
            state.loginStatus=true;
            state.user.name=data.name;
            state.user.join_date=data.join_date;
            state.user.ID=data.ID;
            state.user.avatar=data.avatar;
            state.user.type=data.user_type;
        },
        submitCart(state){
            state.count=0;
            state.cartItem.clear();
        }
    }
})
export default store;