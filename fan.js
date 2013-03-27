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

    function addName(name) {
        var data = read() || {},
            list = data.list;

        if (exist(name)) {
            alert("exist!");
            return;
        }

        data.list.push(name);

        window.localStorage.setItem(key, JSON.stringify(data));

        alert("add success!");

        elName && (elName.value = "");
    }

    function del(key) {
        var _data = read(),
            data = _data ? JSON.parse(_data) : {};

        delete data["key"];

        window.localStorage.setItem(key, JSON.stringify(data));
    }

    function delName(name) {
        var data = read() || {},
            list = data.list;

        if (!list || !list.length) return;


        var i = 0;
        while(list[i]) {
            if (list[i] === name) {
                list.splice(i);
            }
            i++;
        }

        window.localStorage.setItem(key, JSON.stringify(data));

        alert("delete " + name + " success!");
    }

    function updateName(name) {
        addName(name);
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

    function bind(el, evt, handle) {
        if (!el || (el.nodeType !== 1 && el.nodeType !== 9) || !evt || Object.prototype.toString.call(handle) !== '[object Function]') {
            return;
        }

        el.addEventListener(evt, handle);
    }

    function delegate(el, cls, evt, handle) {
        if (!cls) return;

        bind(el, evt, function(e){
            if (e.target.className.indexOf(cls) >= 0) {
                handle(e);
            }
        });
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
        elName = $("J_Name");

    bind(btnAdd, "click", function(){
        if (elName.value) {
            addName(elName.value);
            renderList();
        }
        else {
            alert("please input something!");
        }
    });

    var _panel_show_ = false;
    bind(btnAdmin, "click", function(e){
        $("J_Panel").style.display = _panel_show_ ? "none" : "block";
        _panel_show_ = !_panel_show_;
    });

    delegate(document, "btn-rm", "click", function(e){
        var name = e.target.getAttribute("data-name");
        if (name) {
            delName(name);
            renderList();
        }
    });

    renderList();

})();
