let arrs = [];
// 递归遍历路由表生成左侧菜单
export const routerlist = (a,b) => {
  if(!a || !b){
    console.error("参数为空")
    return 
  }
  a.map(item => {
    if (!item.meta) {
      if (item.children && item.children.length > 0) {
        routerlist(item.children,b);
        return;
      }
    } else {
      const { type } = item.meta;
      const index = arrs.findIndex(i => i.uname === type);
      if (index === -1) {
        arrs.push({ uname: type, children: [],icon:'' });
      }
      arrs.map(i => {
        if (type === i.uname) {
          i.children.push(item);
        }
      });
    }
  });
  b.forEach(item1 =>{
    arrs.map(i1 => {
      if(item1.name==i1.uname) {
      i1.icon=item1.icon;
      }
    })
  })
  return arrs;
};


// export const shuzuquchong=(arr)=>{
//   arr.map(item=>{
//   return item.id
//   })
// }