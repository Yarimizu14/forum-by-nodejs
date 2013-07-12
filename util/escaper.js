
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

    /*
    if (obj.hasOwnProperty("length")) {      //配列の場合
        for(var i=0, len=obj.length; i<len; i++) {
            if (typeof obj[i] == "string") {
                obj[i] = escape(obj[i]);
            } else if (typeof obj[i] == "object") {
                this.escapeObj(Obj[i]);
            };
        };
   } else {
        for(var key in obj) {
            if (typeof obj[key] == "string") {
                obj[key] = escape(obj[key]);
            } else if (typeof obj[i] == "object") {
                this.escapeObj(Obj[key]);
            };
        };
    };
   */
}

/*
 *  unescapeObj
 * オブジェクトの中の全ての文字列をアンエスケープ
 */
Escaper.prototype.unescapeObj = function(obj) {

   /* 
    if (obj.hasOwnProperty("length")) {      //配列の場合
        for(var i=0, len=obj.length; i<len; i++) {
            if (typeof obj[i] == "string") {
                obj[i] = unescape(obj[i]);
            } else if (typeof obj[i] == "object") {
                this.escapeObj(obj[i]);
            };
        };
   } else {
        console.log(typeof obj[key]);
        for(var key in obj) {
            if (typeof obj[key] == "string") {
                obj[key] = unescape(obj[key]);
            } else if (typeof obj[i] == "object") {
                this.unescapeObj(Obj[key]);
            };
        };
    };
   */
}

function createEscaper() {
    return new Escaper();
};

exports.createEscaper = createEscaper;
