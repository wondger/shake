/*
 * @name: shake.js
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

    var key = "_fan_data_",
        stage = $("J_Stage"),
        w = document.documentElement.clientWidth,
        h = document.documentElement.clientHeight;

    var items = [],
        shakers = {},
        stopped = false,
        selectedIndex;

    var btnAdd = $("J_Add"),
        btnAdmin = $("J_Admin"),
        elName = $("J_Name");

    function read() {
        var data = window.localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    function addName(name) {
        var data = read() || {};
        data.list = data.list || [];

        if (exist(name)) {
            alert("exist!");
            return;
        }

        data.list.push(name);
        randomItem(name);

        window.localStorage.setItem(key, JSON.stringify(data));

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
            list = data.list,
            el;

        if (!list || !list.length) return;

        var i = 0;
        while(list[i]) {
            if (list[i] === name) {
                list.splice(i, 1);
            }
            i++;
        }

        if (el = getEl(name)) {
            el.parentNode.removeChild(el);
        }

        window.localStorage.setItem(key, JSON.stringify(data));
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

        var index = selectedIndex = Math.floor(Math.random() * list.length);

        stop();
        show(items[index]);
    }

    function stop() {
        for (var k in shakers) {
            if (shakers[k]) {
                window.clearInterval(shakers[k]);
                delete shakers[k];
            }
        }

        stopped = true;
    }

    function show(item) {
        item.className = "item item-selected";
        var size = Math.min(w, h);
        item.style.left = (w - size) / 2 + "px";
        item.style.top = (h - size) / 2 + "px";
        item.style.width = item.style.height = size + "px";
        item.style.borderRadius = size/2 + "px";
        item.style.lineHeight = size + "px";
        item.style.zIndex = 10000001;
    }

    function resetItem(index) {
        var item = items[index];

        if (!item) return;

        item.className = "item-naked";
        item.style.width = item.style.height = "auto";

        var width = item.clientWidth + 10;
        /*
         *item.style.left = (w - width) / 2 + "px";
         *item.style.top = (h - width) / 2 + "px";
         */
        item.style.borderRadius = width + "px";
        item.style.width = item.style.height = width + "px";
        item.style.lineHeight = width + "px";

        item.className = "item";
    }

    function shake(item) {
        var width = item.scrollHeight;
        item.style.left = Math.random() * (w - width) + "px";
        item.style.top = Math.random() * (h - width) + "px";

        shakers[item.getAttribute("data-index") || 0] = window.setTimeout(function(){
            shake(item);
        }, 500);
    }

    function shakeAll() {
        resetItem(selectedIndex);
        items.forEach(function(item, index) {
            window.setTimeout(function(){
                shake(item);
            }, Math.floor(Math.random() * 500));
        });
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

        if (!list || !list.length) {
            elList.style.display = "none";
            return;
        }

        var html = "";

        while (list.length) {
            var name = list.shift();
            html += '<li><span>' + name + '</span><button data-name="' + name + '" class="btn-rm">-</button></li>';
        }

        elList.innerHTML = html;
        elList.style.display = "block";
    }

    function randomItem(name) {
        var item = c("span", name);
        item.className = "item";
        stage.appendChild(item);

        item.setAttribute("data-index", items.length);
        items.push(item);

        var width = item.clientWidth + 10;
        item.style.left = Math.random() * (w - width) + "px";
        item.style.top = Math.random() * (h - width) + "px";
        item.style.width = item.style.height = width + "px";
        item.style.borderRadius = width + "px";
        item.style.lineHeight = width + "px";

        window.setTimeout(function(){
            shake(item);
        }, Math.floor(Math.random() * 500))
    }

    function randomItems() {
        var data = read() || {},
            list = data.list;

        if (!list || !list.length) {
            return;
        }

        while (list.length) {
            randomItem(list.shift());
        }
    }

    function getEl(name) {
        var ret;
        items.forEach(function(item, index) {
            if (item.innerHTML === name) {
                ret = item;
                return false;
            }
        });

        return ret;
    }

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
        $("J_PanelWrap").style.display = _panel_show_ ? "none" : "block";
        _panel_show_ = !_panel_show_;
    });

    bind(stage, "click", function(e){
        if (!stopped) {
            select();
        }
        else {
            stopped = false;
            shakeAll();
        }
    });

    delegate(document, "btn-rm", "click", function(e){
        var name = e.target.getAttribute("data-name");
        if (name) {
            delName(name);
            renderList();
        }
    });

    renderList();
    randomItems();

})();
