
function Escaper() {};

/*
 * escape
 * 文字列をエスケープ 
 */
Escaper.prototype.escape = function(str) {

    return String(str)
            .replace(/&(?!\w+;)/g, '&amp;')
            .replace( /</g, "&lt;" )
            .replace( />/g, "&gt;" )
            .replace( /"/g, "&quot;" )
            .replace( /'/g, "&#39;" );
};

/*
 *  unescape
 * 文字列をアンエスケープ 
 */
Escaper.prototype.unescape = function(str) {
    return String(str)
            .replace( /&lt;/g, "<" )
            .replace( /&gt;/g, ">" )
            .replace( /&quot;/g, '"')
            .replace( /&#39;/g, "'" );
}

/*
 *  escapeObj
 * オブジェクトの中の全ての文字列をエスケープ
 */
Escaper.prototype.escapeObj = function(obj) {

    if (obj.hasOwnProperty("length")) {      //配列の場合
        for(var i=0, len=obj.length; i<len; i++) {
            if (typeof obj[i] == "string") {
                //obj[i] = this.escape(obj[i]);
                obj[i] = escape(obj[i]);
                console.log("配列をエスケープ中");
            } else if (typeof obj[i] == "object") {
                this.escapeObj(Obj[i]);
            };
        };
   } else {
        for(var key in obj) {
            if (typeof obj[key] == "string") {
                //obj[key] = this.escape(obj[key]);
                obj[key] = escape(obj[key]);
                console.log("Objectをエスケープ中");
            } else if (typeof obj[i] == "object") {
                this.escapeObj(Obj[key]);
            };
        };
    };
}

/*
 *  unescapeObj
 * オブジェクトの中の全ての文字列をアンエスケープ
 */
Escaper.prototype.unescapeObj = function(obj) {
    console.log("今からアンエスケープ");
    if (obj.hasOwnProperty("length")) {      //配列の場合
        console.log("アンエスケープで配列を処理");
        for(var i=0, len=obj.length; i<len; i++) {
            if (typeof obj[i] == "string") {
                //obj[i] = this.unescape(obj[i]);
                obj[i] = unescape(obj[i]);
                console.log("配列をアンエスケープ中");
            } else if (typeof obj[i] == "object") {
                this.unescapeObj(obj[i]);
            };
        };
   } else {
        console.log("アンエスケープでオブジェクトを処理");
        console.log(obj);
        console.log(typeof obj[key]);
        for(var key in obj) {
            console.log(typeof obj[key]);
            if (typeof obj[key] == "string") {
                //obj[key] = this.unescape(obj[key]);
                obj[key] = unescape(obj[key]);
                console.log("Objectをアンエスケープ中");
            } else if (typeof obj[i] == "object") {
                this.unescapeObj(Obj[key]);
            };
        };
    };
}

function createEscaper() {
    return new Escaper();
};

exports.createEscaper = createEscaper;
