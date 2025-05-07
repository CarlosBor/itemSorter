const renderBool = (entry:any) =>{
    if(entry===true){
        return "Yes";
      }else if (entry===false){
       return "No";
      }
      return entry
}

export default renderBool;