/*
 * @name: .js
 * @description: 
 * @author: wondger@gmail.com
 * @date: 2013-03-20
 * @param: 
 * @todo: 
 * @changelog: 
 */
(function(){
 var lsSupport = (function(){
        return window.localStorage && window.localStorage.setItem && window.localStorage.getItem && window.localStorage.removeItem;
     })();

 var key = "_fan_data_";
 function read() {
    var data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
 }
 function add(value) {
    var data = read() || {},
         list = data.list;

    data.list.push(value);

    window.localStorage.setItem(key, JSON.stringify(data));
 }
 function del(key) {
    var _data = read(),
    data = _data ? JSON.parse(_data) : {};
    delete data["key"];
    window.localStorage.setItem(key, JSON.stringify(data));
 }
 function update(value) {
    add(value);
 }
 function select() {
var data = read() || {},
    list = data.list;

if (!list || !list.length) {
    alert("Please add some restaurants!");
    return;
}

return data.list[Math.floor(Math.random() * list.length)];
 }
 function shake() {
 }

 function $(id) {
     return document.getElementById(id);
 }
 function c(tag, innerHTML) {
     var node = document.createElement(tag);
     node.innerHTML = innerHTML;
     return node;
 }

 var btnAdd = $("J_Add"),
     btnSelect = $("J_Select"),
     btnAll = $("J_All"),
     name = $("J_Name");

 btnAdd.onclick = function() {
     if (name.value) {
        add(name.value);
     }
 }

 btnSelect.onclick = function() {
     var name = select();

     if (name) {
         alert(name);
     }
 }
 btnAll.onclick = function() {
     var data = read() || {},
         list = data.list || [];
 }
})();
