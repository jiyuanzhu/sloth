Page({
    data:{
        height: 20,
        focus: false,
        ceshi:'',
        ceshis:''
    },
    bindTextAreaBlur: function(e) {
        this.setData({
         ceshi:e.detail.value
        }) 

     },    
     formSubmit: function(e) {
   
       this.setData({
           ceshis:this.data.ceshi
       })
     }
})