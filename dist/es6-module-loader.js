/*
 *  es6-module-loader v0.4.1
 *  https://github.com/ModuleLoader/es6-module-loader
 *  Implemented to the 2013-12-02 ES6 module specification draft
 *  Copyright (c) 2014 Guy Bedford, Luke Hoban, Addy Osmani; Licensed MIT
 */
!function(){function __scopedEval(__source,global,__sourceURL){try{eval("with(global) { (function() { "+__source+" \n }).call(global); }"+(__sourceURL&&!__source.match(/\/\/[@#] ?(sourceURL|sourceMappingURL)=([^\n]+)/)?"\n//# sourceURL="+__sourceURL:""))}catch(e){throw"SyntaxError"==e.name&&(e.message="Evaluating "+__sourceURL+"\n	"+e.message),e}}!function(){function a(a,b){b||console.log("Assertion Failed - "+a)}function b(a,b,c){Object.defineProperty?Object.defineProperty(a,b,c):a[b]=c.value||c.get.call(a)}function c(a){Object.preventExtensions&&Object.preventExtensions(a)}function d(a){return{status:"loading",name:a,metadata:{},linkSets:[]}}function e(b,c,e,g){return new D(function(a){a(b.normalize(c,e,g))}).then(function(c){var e;if(b._modules[c])return e=d(c),e.status="linked",e;for(var g=0,h=b._loads.length;h>g;g++)if(e=b._loads[g],e.name==c)return a("loading or loaded","loading"==e.status||"loaded"==e.status),e;return e=d(c),b._loads.push(e),f(b,e),e})}function f(a,b){g(a,b,D.resolve().then(function(){return a.locate({name:b.name,metadata:b.metadata})}))}function g(a,b,c){h(a,b,c.then(function(c){return"failed"==b.status?void 0:(b.address=c,a.fetch({name:b.name,metadata:b.metadata,address:c}))}))}function h(b,c,d){d.then(function(a){return"failed"==c.status?void 0:b.translate({name:c.name,metadata:c.metadata,address:c.address,source:a})}).then(function(a){return"failed"==c.status?void 0:(c.source=a,b.instantiate({name:c.name,metadata:c.metadata,address:c.address,source:a}))}).then(function(d){if("failed"==c.status)return void 0;var f;if(void 0===d)throw"Declarative parsing is not implemented by the polyfill.";if("object"!=typeof d)throw TypeError("Invalid instantiate return value");f=d.deps||[],c.execute=d.execute,c.kind="dynamic",c.dependencies={};for(var g=[],h=0,i=f.length;i>h;h++)(function(d){var f=e(b,d,c.name,c.address);f.then(function(b){if(a("not already a dependency",!c.dependencies[d]),c.dependencies[d]=b.name,"linked"!=b.status)for(var e=c.linkSets.concat([]),f=0,g=e.length;g>f;f++)j(e[f],b)}),g.push(f)})(f[h]);return D.all(g)}).then(function(){a("is loading","loading"==c.status),c.status="loaded";for(var b=c.linkSets.concat([]),d=0,e=b.length;e>d;d++)k(b[d],c)},function(b){a("is loading on fail","loading"==c.status),c.status="failed",c.exception=b;for(var d=0,e=c.linkSets.length;e>d;d++)l(c.linkSets[d],b);a("fail linkSets removed",0==c.linkSets.length)})}function i(a,b){var c,d,e=new D(function(a,b){c=a,d=b}),f={loader:a,loads:[],done:e,resolve:c,reject:d,loadingCount:0};return j(f,b),f}function j(b,c){a("loading or loaded on link set","loading"==c.status||"loaded"==c.status);for(var d=0,e=b.loads.length;e>d;d++)if(b.loads[d]==c)return;b.loads.push(c),c.linkSets.push(b),"loaded"!=c.status&&b.loadingCount++;var f=b.loader;for(var g in c.dependencies){var h=c.dependencies[g];if(!f._modules[h])for(var d=0,e=f._loads.length;e>d;d++)if(f._loads[d].name==h){j(b,f._loads[d]);break}}}function k(b,c){if(a("loaded or linked","loaded"==c.status||"linked"==c.status),b.loadingCount--,!(b.loadingCount>0)){var d=b.loads[0];try{r(b.loads,b.loader)}catch(e){return l(b,e)}a("loads cleared",0==b.loads.length),b.resolve(d)}}function l(b,c){for(var d=b.loads.concat([]),e=0,f=d.length;f>e;e++){var g=d[e],h=E.call(g.linkSets,b);if(a("link not present",-1!=h),g.linkSets.splice(h,1),0==g.linkSets.length){var i=E.call(b.loader._loads,g);-1!=i&&b.loader._loads.splice(i,1)}}b.reject(c)}function m(b,c){c.name&&(a("load not in module table",!b._modules[c.name]),b._modules[c.name]=c.module);var d=E.call(b._loads,c);-1!=d&&b._loads.splice(d,1);for(var e=0,f=c.linkSets.length;f>e;e++)d=E.call(c.linkSets[e].loads,c),c.linkSets[e].loads.splice(d,1);c.linkSets=[]}function n(a,b,c){return new D(o(a,b,c&&c.address?"fetch":"locate",void 0,c&&c.address,void 0)).then(function(a){return a})}function o(b,c,e,j,k,l){return function(m,n){if(b._modules[c])throw new TypeError('Module "'+c+'" already exists in the module table');for(var o=0,p=b._loads.length;p>o;o++)if(b._loads[o].name==c)throw new TypeError('Module "'+c+'" is already loading');var q=d(c);j&&(q.metadata=j);var r=i(b,q);b._loads.push(q),r.done.then(m,n),"locate"==e?f(b,q):"fetch"==e?g(b,q,D.resolve(k)):(a("translate step","translate"==e),q.address=k,h(b,q,D.resolve(l)))}}function p(b,c){return a("is linked "+c.name,"linked"==c.status),a("is a module",c.module instanceof q),c.module}function q(a){if("object"!=typeof a)throw new TypeError("Expected object");if(!(this instanceof q))return new q(a);var d=this;for(var e in a)!function(a,c){b(d,a,{configurable:!1,enumerable:!0,get:function(){return c}})}(e,a[e]);c(this)}function r(a,b){for(var c=0;a.length;){c++;a:for(var d=0;d<a.length;d++){var e=a[d],f=[];for(var g in e.dependencies){var h=e.dependencies[g],i=b._modules[h];if(!i)continue a;f.push(i)}var j=e.execute.apply(null,f);if(!(j instanceof q))throw new TypeError("Execution must define a Module instance");e.module=j,e.status="linked",m(b,e)}if(1e3===c)return console.log("Circular Dependency Detected"),void 0}}function s(a){if("object"!=typeof a)throw new TypeError("Options must be an object");a.normalize&&(this.normalize=a.normalize),a.locate&&(this.locate=a.locate),a.fetch&&(this.fetch=a.fetch),a.translate&&(this.translate=a.translate),a.instantiate&&(this.instantiate=a.instantiate),b(this,"global",{get:function(){throw new TypeError("global accessor not provided by polyfill")}}),b(this,"realm",{get:function(){throw new TypeError("Realms not implemented in polyfill")}}),this._modules={},this._loads=[]}function t(a){var b=String(a).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return b?{href:b[0]||"",protocol:b[1]||"",authority:b[2]||"",host:b[3]||"",hostname:b[4]||"",port:b[5]||"",pathname:b[6]||"",search:b[7]||"",hash:b[8]||""}:null}function u(a,b){function c(a){var b=[];return a.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(a){"/.."===a?b.pop():b.push(a)}),b.join("").replace(/^\//,"/"===a.charAt(0)?"/":"")}return b=t(b||""),a=t(a||""),b&&a?(b.protocol||a.protocol)+(b.protocol||b.authority?b.authority:a.authority)+c(b.protocol||b.authority||"/"===b.pathname.charAt(0)?b.pathname:b.pathname?(a.authority&&!a.pathname?"/":"")+a.pathname.slice(0,a.pathname.lastIndexOf("/")+1)+b.pathname:a.pathname)+(b.protocol||b.authority||b.pathname?b.search:b.search||a.search)+b.hash:null}function v(){return L?D.resolve(L):M?M:M=(z?B.System.import:function(){return D.resolve(require("traceur"))}).call(B.System,"traceur",{address:P}).then(function(a){return M=null,z&&(a=A.traceur),L=a,L.codegeneration.ModuleLoaderTransformer=w(L.codegeneration.ParseTreeFactory,L.codegeneration.ParseTreeTransformer),L})}function w(a,b){var c=a.createAssignmentExpression,d=a.createVariableDeclaration,e=(a.createCallExpression,a.createVariableDeclarationList),f=a.createStringLiteral,g=a.createIdentifierExpression,h=a.createMemberLookupExpression,i=a.createCommaExpression,j=a.createVariableStatement,k=a.createAssignmentStatement,l=a.createExpressionStatement,m=function(a,b){this.depMap=a,this.exportGlobal=b};return m.prototype=Object.create(b.prototype),m.prototype.createModuleVariableDeclaration=function(a,b,c,f){var g=this,h=b.map(function(b,e){return d(b,g.createImportExpression(a,c[e]))}),i=e("var",h);return i.location=f,j(i)},m.prototype.createImportExpression=function(a,b){var c=g(this.depMap[a]);return b?h(c,f(b)):c},m.prototype.createExportExpression=function(a){return h(g(this.exportGlobal),f(a))},m.prototype.transformImportDeclaration=function(a){var b=a.moduleSpecifier.token.processedValue,c=[],d=[];if(a.importClause){if(a.importClause&&a.importClause.binding)c.push(a.importClause.binding.identifierToken),d.push("default");else if(a.importClause)for(var e=a.importClause.specifiers,f=0;f<e.length;f++){var g=e[f];c.push(g.rhs?g.rhs.value:g.lhs.value),d.push(g.lhs.value)}return this.createModuleVariableDeclaration(b,c,d,a.location)}},m.prototype.transformModuleDeclaration=function(a){var b=a.expression.token.processedValue;return this.createModuleVariableDeclaration(b,[a.identifier],[null],a.location)},m.prototype.transformExportDeclaration=function(a){var b=a.declaration;if("NAMED_EXPORT"==b.type){var f=b.moduleSpecifier&&b.moduleSpecifier.token.processedValue;if("EXPORT_STAR"!=b.specifierSet.type){for(var h=[],j=b.specifierSet.specifiers,m=0;m<j.length;m++){var n=j[m];h.push(c(this.createExportExpression(n.rhs?n.rhs.value:n.lhs.value),f?this.createImportExpression(f,n.lhs.value):g(n.lhs.value)))}var o=l(i(h));return o.location=a.location,o}var p=k(g(this.exportGlobal),this.createImportExpression(f));return p.location=a.location,p}if("VARIABLE_STATEMENT"==b.type){var q=b.declarations.declarations[0];return q.initialiser=c(this.createExportExpression(q.lvalue.identifierToken.value),this.transformAny(q.initialiser)),b}if("FUNCTION_DECLARATION"==b.type){var q=d(b.name.identifierToken.value,k(this.createExportExpression(b.name.identifierToken.value),this.transformAny(b)));return q.location=a.location,e("var",[q])}return"EXPORT_DEFAULT"==b.type?k(this.createExportExpression("default"),this.transformAny(b.expression)):a},m}function x(a,b,c,d){var e,f;if(b(a,c,d)!==!1)for(e in a)a.hasOwnProperty(e)&&"location"!=e&&"type"!=e&&(f=a[e],"object"==typeof f&&null!==f&&x(f,b,a,e))}function y(a){function b(a){-1==E.call(c,a)&&c.push(a)}var c=[];return x(a,function(a){"EXPORT_DECLARATION"==a.type?a.declaration.moduleSpecifier&&b(a.declaration.moduleSpecifier.token.processedValue):"IMPORT_DECLARATION"==a.type?b(a.moduleSpecifier.token.processedValue):"MODULE_DECLARATION"==a.type&&b(a.expression.token.processedValue)}),c}var z="undefined"!=typeof window,A=z?window:this,B=z?window:module.exports,C=z?function(a){setTimeout(a,1)}:process.nextTick,D=A.Promise;if(D)if(D.all&&D.resolve&&D.reject){D=A.Promise;{new D(function(a){"function"!=typeof a&&(D=null)})}}else D=null;D||(A.Promise=D=function(a,b,c){function d(a,b){return(typeof b)[0]==a}function e(a,h){return h=function i(j,k,l,m,n,o){function p(a){return function(b){n&&(n=0,i(d,a,b))}}if(m=i.q,j!=d)return e(function(a,b){m.push({p:this,r:a,j:b,1:j,0:k})});if(l&&d(b,l)|d(c,l))try{n=l.then}catch(q){k=0,l=q}if(d(b,n))try{n.call(l,p(1),k=p(0))}catch(q){k(q)}else for(h=f(a,l,k),o=0;o<m.length;)n=m[o++],d(b,j=n[k])?g(n.p,n.r,n.j,l,j):(k?n.r:n.j)(l)},h.q=[],a.call(a={then:function(a,b){return h(a,b)}},function(a){h(d,1,a)},function(a){h(d,0,a)}),a}function f(a,c,f){return function(h,i){return d(b,h=f?h:i)?e(function(a,b){g(this,a,b,c,h)}):a}}function g(e,f,g,h,i){a(function(){try{h=i(h),i=h&&d(c,h)|d(b,h)&&h.then,d(b,i)?h==e?g(new TypeError):i.call(h,f,g):f(h)}catch(a){g(a)}})}return e.resolve=function(a,b){return(b={}).then=f(b,a,1),b},e.reject=function(a,b){return(b={}).then=f(b,a,0),b},e.all=function(b){return new e(function(c,d){if(!b.length)return a(c);for(var e=[],f=0,g=0,h=b.length;h>g;g++)(function(a){b[a].then(function(d){e[a]=d,f++,f==b.length&&c(e)},d)})(g)})},e}(C,"f","o"));var E=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},F={};s.prototype={define:function(a,b,c){if(F[a])throw new TypeError("Module is already loading.");return F[a]=new D(o(this,a,c&&c.address?"fetch":"translate",c&&c.meta||{},c&&c.address,b)),F[a].then(function(){delete F[a]})},load:function(a,b){return this._modules[a]?D.resolve(this._modules[a]):F[a]?F[a]:(F[a]=n(this,a,b),F[a].then(function(){delete F[a]}))},module:function(a,b){var c=d();c.address=b&&b.address;var e=i(this,c),f=D.resolve(a),g=e.done.then(function(){p(this,c)});return h(this,c,f),g},"import":function(a,b){return this._modules[a]?D.resolve(this._modules[a]):(F[a]||(F[a]=n(this,a,b))).then(function(b){return delete F[a],p(this,b)})},eval:function(){throw new TypeError("Eval not implemented in polyfill")},get:function(a){return this._modules[a]},has:function(a){return!!this._modules[a]},set:function(a,b){if(!(b instanceof q))throw new TypeError("Set must be a module");this._modules[a]=b},"delete":function(a){return this._modules[a]?delete this._modules[a]:!1},entries:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},keys:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},values:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},normalize:function(a){return a},locate:function(a){return a.name},fetch:function(){throw new TypeError("Fetch not implemented")},translate:function(a){return a.source},instantiate:function(){}};var G;if(z)G=function(a,b,c){var d=new XMLHttpRequest;if(!("withCredentials"in d)){var e=!0,f=/^(\w+:)?\/\/([^\/]+)/.exec(a);f&&(e=f[2]===window.location.host,f[1]&&(e&=f[1]===window.location.protocol)),e||(d=new XDomainRequest)}d.onreadystatechange=function(){4===d.readyState&&(200===d.status||0==d.status&&d.responseText?b(d.responseText):c(d.statusText+": "+a||"XHR error"))},d.open("GET",a,!0),d.send(null)};else{var H=require("fs");G=function(a,b,c){return H.readFile(a,function(a,d){return a?c(a):(b(d+""),void 0)})}}var I=new s({global:z?window:A,strict:!0,normalize:function(a,b){if("string"!=typeof a)throw new TypeError("Module name must be a string");var c=a.split("/");if(0==c.length)throw new TypeError("No module name provided");var d=0,e=!1,f=0;if("."==c[0]){if(d++,d==c.length)throw new TypeError('Illegal module name "'+a+'"');e=!0}else{for(;".."==c[d];)if(d++,d==c.length)throw new TypeError('Illegal module name "'+a+'"');d&&(e=!0),f=d}for(var g=d;g<c.length;g++){var h=c[g];if(""==h||"."==h||".."==h)throw new TypeError('Illegal module name"'+a+'"')}if(!e)return a;{var i=[],j=(b||"").split("/");j.length-1-f}return i=i.concat(j.splice(0,j.length-1-f)),i=i.concat(c.splice(d)),i.join("/")},locate:function(a){var b,c=a.name,d="";for(var e in this.paths){var f=e.split("*");if(f.length>2)throw new TypeError("Only one wildcard in a path is permitted");1==f.length?c==e&&e.length>d.length&&(d=e):c.substr(0,f[0].length)==f[0]&&c.substr(c.length-f[1].length)==f[1]&&(d=e,b=c.substr(f[0].length,c.length-f[1].length-f[0].length))}var g=this.paths[d];return b&&(g=g.replace("*",b)),u(this.baseURL,g)},fetch:function(a){var b,c,d=new D(function(a,d){b=a,c=d});return G(u(this.baseURL,a.address),function(a){b(a)},c),d},instantiate:function(a){if(!a.source)return{deps:[],execute:function(){return new A.Module({})}};if(!a.metadata.es6&&a.name&&(a.metadata.es6===!1||!a.source.match(N)))return{deps:[],execute:function(){return __scopedEval(a.source,A,a.address),"traceur"==a.name&&z&&(A.traceur=A.System.get("../src/traceur.js"),A.System=I),new q({})}};var b;if(b=a.source.match(O))return{deps:[b[1]||b[2]],execute:function(a){return a}};return a.address=a.address||"anonymous-module-"+J++,v().then(function(b){b.options.sourceMaps=!0,b.options.modules="parse";var c=new b.util.ErrorReporter;c.reportMessageInternal=function(a,b){throw b+"\n"+a};var d=new b.syntax.Parser(c,new b.syntax.SourceFile(a.address,a.source)),e=d.parseModule(),f=y(e);return{deps:f,execute:function(){for(var d={},g=0;g<arguments.length;g++){var h="__moduleDependency"+g;A[h]=arguments[g],d[f[g]]=h}var i=new b.codegeneration.FromOptionsTransformer(c);i.append(function(a){return new b.codegeneration.ModuleLoaderTransformer(d,"__exports").transformAny(a)}),e=i.transform(e);var j=new b.outputgeneration.SourceMapGenerator({file:a.address}),k={sourceMapGenerator:j};source=b.outputgeneration.TreeWriter.write(e,k),z&&(source+="\n//# sourceMappingURL=data:application/json;base64,"+btoa(k.sourceMap)+"\n"),A.__exports={},__scopedEval(source,A,a.address);var l=A.__exports;delete A.__exports;for(var g=0;g<arguments.length;g++)delete A["__moduleDependency"+g];return new q(l)}}})}}),J=1;if(z){var K=window.location.href.split("#")[0].split("?")[0];I.baseURL=K.substring(0,K.lastIndexOf("/")+1)}else I.baseURL="./";I.paths={"*":"*.js"};var L,M,N=/(?:^\s*|[}{\(\);,\n]\s*)(import\s+['"]|(import|module)\s+[^"'\(\)\n;]+\s+from\s+['"]|export\s+(\*|\{|default|function|var|const|let|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*))/,O=/^\s*export\s*\*\s*from\s*(?:'([^']+)'|"([^"]+)")/;B.Loader=s,B.Module=q,B.System=I;var P;if(z){var Q=document.getElementsByTagName("script");Q=Q[Q.length-1],P=Q.getAttribute("data-traceur-src")||Q.src.substr(0,Q.src.lastIndexOf("/")+1)+"traceur.js",document.onreadystatechange=function(){if("interactive"==document.readyState)for(var a=document.getElementsByTagName("script"),b=0;b<a.length;b++){var c=a[b];if("module"==c.type){var d=c.getAttribute("name"),e=c.getAttribute("src"),f=c.innerHTML;(d?I.define(d,f,{address:e}):I.module(f,{address:e})).then(function(){},function(a){C(function(){throw a})})}}},Q.getAttribute("data-init")&&window[Q.getAttribute("data-init")]()}}()}();