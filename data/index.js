var fs = require('fs');

function getItems() {
    var data = JSON.parse(fs.readFileSync('./data/items.json'));
    return data.items;
}

function saveItems(items) {
    fs.writeFileSync('./data/items.json', JSON.stringify({items: items}));
}

module.exports = {
    getItems: getItems,
    getItem: function (id) {
        var items = getItems(),
            item = {};

        items.forEach(function (value) {
            if (value.id === id) {
                item = value;
            }
        });

        return item;
    },
    addItem: function (title) {
        var items = getItems();
        var newItem = {
            title: title,
            isComplete: false,
            id: new Array(3).join((((1 + Math.random()) * 0x10000) | 0).toString(36)),
            _created: new Date().toISOString(),
            _updated: ''
        };

        items.unshift(newItem);

        saveItems(items);

        return newItem;
    },
    updateItem: function (id, item) {
        var items = getItems(),
            status = "NOT_OK",
            i;

        for (i = 0; i < items.length; ++i) {
            if (items[i].id === id) {
                items[i] = item;
                items[i]._updated = new Date().toISOString();
                status = "OK";
                break;
            }
        }

        saveItems(items);

        return {status: status};
    },
    deleteItem: function (id) {
        var items = getItems(),
            status = "NOT_OK",
            i;

        for (i = 0; i < items.length; ++i) {
            if (items[i].id === id) {
                items.splice(i--, 1);
                status = "OK";
                break;
            }
        }

        saveItems(items);

        return {status: status};
    }
};