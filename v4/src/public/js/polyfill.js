"use strict";

(function (el) {
    el.multipleContains = function (string) {
        string = string.replace(/\s+/g, ' ');
        let classes = string.split(' ');
        const index = classes.findIndex(item => !this.contains(item));
        return index < 0;
    }
}(DOMTokenList.prototype));