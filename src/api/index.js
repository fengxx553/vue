import req from "./req.js";
let url = "/api";
export const alladminlist = (offset, limit) =>
  req({ url: `${url}/admin/all?offset=${offset}&limit=${limit}` }, "GET");
export const shoppinglist = (latitude, longitude,offset,limit) =>
  req(
    {
      url: `${url}/shopping/restaurants?latitude=${latitude}&longitude=${longitude}&offset=${offset}&limit=${limit}`
    },
    "GET"
  );
export const getLongitude = () =>
  req({ url: `${url}/v1/cities?type=guess` }, "GET");
export const getshoplist = (latitude, longitude) =>
  req({
    url: `${url}/shopping/v2/restaurant/category?latitude=${latitude}&longitude=${longitude}`
  });
export const login = data =>
  req({ url: `${url}/admin/login`, method: "POST", data });
export const setshopping = data =>
  req({ url: `${url}/shopping/updateshop`, method: "POST", data });
export const getadmininfo = () =>
  req({ url: `${url}/admin/info`, method: "GET" });
export const deleteshopping = id =>
  req({ url: `${url}/shopping/restaurant/${id}`, method: "DELETE" });
export const getfoods = (offset, limit, restaurant_id) =>
  req({
    url: `${url}/shopping/v2/foods?offset=${offset}&limit=${limit}&restaurant_id=${restaurant_id}`
  });
export const getshoppingcount = () =>
  req({ url: `${url}/shopping/v2/foods/count`, method: "get" });
export const getshoppingrestaurant = id =>
  req({ url: `${url}/shopping/restaurant/${id}`, method: "get" });
export const getshoppingmenu = (id, allMenu) => {
  if (allMenu) {
    return req({
      url: `${url}/shopping/v2/menu/?restaurant_id=${id}&allMenu=${allMenu}`,
      method: "get"
    });
  } else {
    return req({ url: `${url}/shopping/v2/menu/${id}`, method: "get" });
  }
};
export const setfoods = data =>
  req({ url: `${url}/shopping/v2/updatefood`, method: "POST", data });
export const deletefood = id =>
  req({ url: `${url}/shopping/v2/food/${id}`, method: "delete" });

export const getuserinfo = id =>
  req({ url: `${url}/v1/user/${id}`, method: "get" });
export const getorderlist = (offset, limit) =>
  req({
    url: `${url}/bos/orders?offset=${offset}&limit=${limit}`,
    method: "get"
  });
export const getorderaddresse = id =>
  req({ url: `${url}/v1/addresse/${id}`, method: "get" });

export const getuserlist = (offset, limit) =>
  req({
    url: `${url}/v1/users/list?offset=${offset}&limit=${limit}`,
    method: "get"
  });
export const getusercount = () =>req({url:`${url}/v1/users/count`,method:"get"})
export const getordercount = () =>req({url:`${url}/bos/orders/count`,method:"get"})
export const getadminconut = () =>req({url:`${url}/admin/count`,method:"get"})
export const getadderss=(latitude, longitude)=>req({url:`${url}/v2/pois/${latitude},${longitude}`})
export const addshop=(data)=>req({url:`${url}/shopping/addshop`,method:"post",data})
export const setclassform=(data)=>req({url:`${url}/shopping/addcategory`,method:"post",data})
export const getcategory=(id)=>req({url:`${url}/shopping/getcategory/${id}`,method:"get"})
export const addgoods=(data)=>req({url:`${url}/shopping/addfood`,method:"post",data})
export const getcitycount=()=>req({url:`${url}/v1/user/city/count`,method:"get"})