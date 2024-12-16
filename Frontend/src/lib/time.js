
export const getTime = (time) =>{
    if(new Date().getDate() == new Date(time).getDate()){
        return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    else{
        return new Date(time).toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' }) + ", " +  new Date(time).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    }

}