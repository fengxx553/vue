// 递归遍历路由表生成左侧菜单
export const routerlist = (a, b) => {
  if (!a || !b) {
    console.error("参数为空");
    return;
  } else {
    const menuList = [];
    return generateMenuList(a, b, menuList);
  }
};
const generateMenuList = (a, b, menuList) => {
  a.forEach(item => {
    if (item.meta) {
      const { type } = item.meta;
      const index = menuList.findIndex(i => i.uname === type);
      if (index === -1) {
        menuList.push({ uname: type, children: [], icon: "" });
      }
      addMenuItem(menuList, type, item);
    } else if (item.children && item.children.length > 0) {
      generateMenuList(item.children, b, menuList);
    }
  });
  setMenuIcon(menuList, b);
  return menuList;
};

const addMenuItem = (menuList, type, item) => {
  menuList.forEach(i => {
    if (type === i.uname) {
      i.children.push(item);
    }
  });
};

const setMenuIcon = (menuList, b) => {
  b.forEach(item1 => {
    menuList.forEach(i1 => {
      if (item1.name == i1.uname) {
        i1.icon = item1.icon;
      }
    });
  });
};

// export const shuzuquchong=(arr)=>{
//   arr.map(item=>{
//   return item.id
//   })
// }
