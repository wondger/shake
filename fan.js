/*
 * @name: fan.js
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

        if (exist(value)) {
            alert("exist!");
            return;
        }

        data.list.push(value);

        window.localStorage.setItem(key, JSON.stringify(data));

        alert("add success!");
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
    function exist(name) {
        var data = read() || {},
            list = data.list;

        if (!list || !list.length) {
            return false;
        }

        while (list.length) {
            if (list.shift() === name) {
                return true;
            }
        }

        return false;
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
        node.className = "name";
        node.innerHTML = innerHTML;
        return node;
    }

    function renderList() {
        var elList = $("J_List");
        var data = read() || {},
            list = data.list;

        if (!list || !list.length) return;

        var html = "";

        while (list.length) {
            var name = list.shift();
            html += '<li><span>' + name + '</span><button data-name="' + name + '" class="btn-rm">-</button></li>';
        }

        elList.innerHTML = html;
    }

    var btnAdd = $("J_Add"),
        btnAdmin = $("J_Admin"),
        name = $("J_Name");

    btnAdd.onclick = function() {
        if (name.value) {
            add(name.value);
            renderList();
        }
        else {
            alert("please input something!");
        }
    }

    var _panel_show_ = false;
    btnAdmin.onclick = function() {
        $("J_Panel").style.display = _panel_show_ ? "none" : "block";
        _panel_show_ = !_panel_show_;
    }

    renderList();

})();
