let arrs = [];
// 递归遍历路由表生成左侧菜单
export const routerlist = (a) => {
  a.map(item => {
    if (!item.meta) {
      if (item.children && item.children.length > 0) {
        routerlist(item.children);
        return;
      }
    } else {
      const { type } = item.meta;
      const index = arrs.findIndex(i => i.uname === type);
      if (index === -1) {
        arrs.push({ uname: type, children: [] });
      }
      arrs.map(i => {
        if (type === i.uname) {
          i.children.push(item);
        }
      });
    }
  });
  return arrs;
};


export const shuzuquchong=(arr)=>{
  arr.map(item=>{
  return item.id
  })
}